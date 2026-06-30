-- Faz C: Siparis kaydi (checkout -> Supabase -> admin panel)
-- SQL Editor'de tek seferde calistirin (phase-b atlanmissa da calisir).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- On kosullar (yoksa olustur)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

-- ---------------------------------------------------------------------------
-- Tablolar
-- ---------------------------------------------------------------------------

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  customer_note text not null default '',
  subtotal numeric(10, 2),
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_status_check check (
    status in ('new', 'confirmed', 'preparing', 'shipped', 'completed', 'cancelled')
  )
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_slug text not null,
  product_name text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(10, 2),
  line_total numeric(10, 2),
  created_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists order_items_order_idx on public.order_items (order_id);

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Admins read orders" on public.orders;
create policy "Admins read orders"
on public.orders for select to authenticated
using (public.is_admin());

drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders"
on public.orders for update to authenticated
using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins read order items" on public.order_items;
create policy "Admins read order items"
on public.order_items for select to authenticated
using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Checkout RPC (anon insert guvenli)
-- ---------------------------------------------------------------------------

create or replace function public.create_store_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_address text,
  p_customer_note text default '',
  p_subtotal numeric default null,
  p_items jsonb default '[]'::jsonb
)
returns table (order_id uuid, order_number text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
  v_qty integer;
  v_unit numeric;
  v_attempt integer := 0;
begin
  if coalesce(trim(p_customer_name), '') = '' then
    raise exception 'Musteri adi gerekli';
  end if;
  if coalesce(trim(p_customer_phone), '') = '' then
    raise exception 'Telefon gerekli';
  end if;
  if coalesce(trim(p_customer_address), '') = '' then
    raise exception 'Adres gerekli';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Sepet bos';
  end if;

  loop
    v_attempt := v_attempt + 1;
    v_order_number := 'HY-' || to_char(now(), 'YYYYMMDD') || '-' ||
      lpad((floor(random() * 10000))::text, 4, '0');
    exit when not exists (select 1 from public.orders o where o.order_number = v_order_number);
    exit when v_attempt > 20;
  end loop;

  insert into public.orders (
    order_number,
    customer_name,
    customer_phone,
    customer_address,
    customer_note,
    subtotal,
    status
  ) values (
    v_order_number,
    trim(p_customer_name),
    trim(p_customer_phone),
    trim(p_customer_address),
    coalesce(trim(p_customer_note), ''),
    p_subtotal,
    'new'
  )
  returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_qty := greatest(1, coalesce((v_item ->> 'quantity')::integer, 1));
    v_unit := nullif(v_item ->> 'unit_price', '')::numeric;

    insert into public.order_items (
      order_id,
      product_slug,
      product_name,
      quantity,
      unit_price,
      line_total
    ) values (
      v_order_id,
      coalesce(v_item ->> 'slug', ''),
      coalesce(v_item ->> 'name', 'Urun'),
      v_qty,
      v_unit,
      case when v_unit is null then null else v_unit * v_qty end
    );
  end loop;

  order_id := v_order_id;
  order_number := v_order_number;
  return next;
end;
$$;

revoke all on function public.create_store_order(text, text, text, text, numeric, jsonb) from public;
grant execute on function public.create_store_order(text, text, text, text, numeric, jsonb) to anon, authenticated;
