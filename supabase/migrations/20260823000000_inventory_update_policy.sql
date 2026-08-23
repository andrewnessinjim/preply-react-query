create policy "Inventory items are publicly updatable"
  on public.inventory_items
  for update
  to anon
  using (true)
  with check (true);

grant update on public.inventory_items to anon;
