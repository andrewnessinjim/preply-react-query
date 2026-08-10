create table public.orders (
  id bigint generated always as identity primary key,
  customer_name text not null,
  item text not null,
  status text not null default 'received'
    check (status in ('received', 'preparing', 'out_for_delivery', 'delivered')),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Orders are publicly readable"
  on public.orders
  for select
  to anon
  using (true);

create policy "Orders are publicly updatable"
  on public.orders
  for update
  to anon
  using (true)
  with check (true);

grant select, update on public.orders to anon;
