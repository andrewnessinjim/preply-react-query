create table public.plants (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  price_cents integer not null,
  light text not null,
  water text not null,
  summary text not null,
  care_guide text not null
);

alter table public.plants enable row level security;

create policy "Plants are publicly readable"
  on public.plants
  for select
  to anon
  using (true);

grant select on public.plants to anon;
