create policy "Orders are publicly insertable"
  on public.orders
  for insert
  to anon
  with check (true);

grant insert on public.orders to anon;
