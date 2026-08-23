create table public.todos (
  id bigint generated always as identity primary key,
  title text not null,
  status boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy "Todos are publicly readable"
  on public.todos
  for select
  to anon
  using (true);

create policy "Todos are publicly insertable"
  on public.todos
  for insert
  to anon
  with check (true);

create policy "Todos are publicly updatable"
  on public.todos
  for update
  to anon
  using (true)
  with check (true);

grant select, insert, update on public.todos to anon;

insert into public.todos (title, status) values
  ('Write the invalidateQueries demo', true),
  ('Review PR feedback', false),
  ('Buy coffee beans', false),
  ('Plan next sprint', false),
  ('Update onboarding docs', true),
  ('Fix flaky test', false);
