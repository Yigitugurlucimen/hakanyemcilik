-- Faz A: Hakan Yemcilik urun tablosu
-- Supabase Dashboard > SQL Editor > New query > bu dosyayi calistirin

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default '',
  stock text not null default 'Stokta',
  campaign text,
  tags text[] not null default '{}',
  purpose text not null default '',
  dosage text not null default '',
  details text not null default '',
  period text not null default '',
  content text not null default '',
  usage_plan text not null default '',
  caution text not null default '',
  price numeric(10, 2),
  image_url text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_active_idx on public.products (is_active);
create index if not exists products_sort_idx on public.products (sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Admins can read all products" on public.products;
create policy "Admins can read all products"
on public.products
for select
to authenticated
using (true);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products
for delete
to authenticated
using (true);

-- Panel girisi: Supabase Dashboard > Authentication > Users > Add user
-- (e-posta + sifre ile admin hesabi olusturun)
