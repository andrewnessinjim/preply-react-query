create table public.inventory_items (
  id bigint generated always as identity primary key,
  sku text not null,
  name text not null,
  category text not null,
  price_cents integer not null,
  stock integer not null
);

alter table public.inventory_items enable row level security;

create policy "Inventory items are publicly readable"
  on public.inventory_items
  for select
  to anon
  using (true);

grant select on public.inventory_items to anon;
