create table public.team_members (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null,
  department text not null,
  location text not null,
  email text not null,
  bio text not null,
  created_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

create policy "Team members are publicly readable"
  on public.team_members
  for select
  to anon
  using (true);

grant select on public.team_members to anon;
