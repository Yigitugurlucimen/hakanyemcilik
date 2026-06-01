-- Faz B: Admin guvenligi, kampanya/blog CMS, urun gorseli storage
-- Supabase Dashboard > SQL Editor > phase-a (schema.sql) sonrasi calistirin
--
-- Admin hesabi icin (birini secin):
-- 1) Authentication > Users > kullanici > Raw App Meta Data: {"role":"admin"}
-- 2) Asagidaki admin_allowlist tablosuna e-posta ekleyin

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Admin kontrolu
-- ---------------------------------------------------------------------------

create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return false;
  end if;

  if coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin' then
    return true;
  end if;

  return exists (
    select 1
    from public.admin_allowlist
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
end;
$$;

-- Ornek: INSERT INTO public.admin_allowlist (email) VALUES ('sizin@eposta.com');

-- ---------------------------------------------------------------------------
-- Products RLS (sadece admin yazabilir)
-- ---------------------------------------------------------------------------

drop policy if exists "Admins can read all products" on public.products;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;

create policy "Admins can read all products"
on public.products for select to authenticated
using (public.is_admin());

create policy "Admins can insert products"
on public.products for insert to authenticated
with check (public.is_admin());

create policy "Admins can update products"
on public.products for update to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Admins can delete products"
on public.products for delete to authenticated
using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Kampanyalar
-- ---------------------------------------------------------------------------

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null default '',
  goal text not null default '',
  usage_window text not null default '',
  focus_tags text[] not null default '{}',
  benefits text[] not null default '{}',
  product_slugs text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_active_idx on public.campaigns (is_active);
create index if not exists campaigns_sort_idx on public.campaigns (sort_order);

drop trigger if exists campaigns_updated_at on public.campaigns;
create trigger campaigns_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

alter table public.campaigns enable row level security;

drop policy if exists "Public can read active campaigns" on public.campaigns;
create policy "Public can read active campaigns"
on public.campaigns for select to anon, authenticated
using (is_active = true);

drop policy if exists "Admins manage campaigns" on public.campaigns;
create policy "Admins manage campaigns"
on public.campaigns for all to authenticated
using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Blog yazilari
-- ---------------------------------------------------------------------------

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  campaign_slug text,
  title text not null,
  excerpt text not null default '',
  read_time text not null default '5 dk',
  keywords text[] not null default '{}',
  sections jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_active_idx on public.blog_posts (is_active);
create index if not exists blog_posts_campaign_idx on public.blog_posts (campaign_slug);

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read active blog posts" on public.blog_posts;
create policy "Public can read active blog posts"
on public.blog_posts for select to anon, authenticated
using (is_active = true);

drop policy if exists "Admins manage blog posts" on public.blog_posts;
create policy "Admins manage blog posts"
on public.blog_posts for all to authenticated
using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: product-images bucket
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Admins upload product images" on storage.objects;
create policy "Admins upload product images"
on storage.objects for insert to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins update product images" on storage.objects;
create policy "Admins update product images"
on storage.objects for update to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins delete product images" on storage.objects;
create policy "Admins delete product images"
on storage.objects for delete to authenticated
using (bucket_id = 'product-images' and public.is_admin());
