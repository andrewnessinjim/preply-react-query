create table public.reviews (
  id bigint generated always as identity primary key,
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  created_at timestamptz not null
);

alter table public.reviews enable row level security;

create policy "Reviews are publicly readable"
  on public.reviews
  for select
  to anon
  using (true);

grant select on public.reviews to anon;
