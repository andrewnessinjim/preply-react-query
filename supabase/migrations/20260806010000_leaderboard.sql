create table public.games (
  id bigint generated always as identity primary key,
  title text not null,
  genre text not null,
  release_year integer not null
);

create table public.players (
  id bigint generated always as identity primary key,
  gamertag text not null,
  country text not null,
  joined_at timestamptz not null default now()
);

create table public.scores (
  id bigint generated always as identity primary key,
  player_id bigint not null references public.players (id),
  game_id bigint not null references public.games (id),
  score integer not null,
  combo integer not null,
  accuracy numeric(5, 2) not null,
  played_at timestamptz not null default now()
);

create index scores_player_id_idx on public.scores (player_id);
create index scores_game_id_idx on public.scores (game_id);
create index scores_score_idx on public.scores (score);
create index scores_combo_idx on public.scores (combo);
create index scores_accuracy_idx on public.scores (accuracy);
create index scores_played_at_idx on public.scores (played_at);

alter table public.games enable row level security;
alter table public.players enable row level security;
alter table public.scores enable row level security;

create policy "Games are publicly readable"
  on public.games
  for select
  to anon
  using (true);

create policy "Players are publicly readable"
  on public.players
  for select
  to anon
  using (true);

create policy "Scores are publicly readable"
  on public.scores
  for select
  to anon
  using (true);

grant select on public.games to anon;
grant select on public.players to anon;
grant select on public.scores to anon;
