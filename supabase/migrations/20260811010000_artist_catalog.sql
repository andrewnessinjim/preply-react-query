create table public.albums (
  id bigint generated always as identity primary key,
  artist text not null,
  title text not null,
  release_year integer not null
);

create table public.tour_dates (
  id bigint generated always as identity primary key,
  artist text not null,
  city text not null,
  venue text not null,
  show_date date not null
);

alter table public.albums enable row level security;
alter table public.tour_dates enable row level security;

create policy "Albums are publicly readable"
  on public.albums
  for select
  to anon
  using (true);

create policy "Tour dates are publicly readable"
  on public.tour_dates
  for select
  to anon
  using (true);

grant select on public.albums to anon;
grant select on public.tour_dates to anon;
