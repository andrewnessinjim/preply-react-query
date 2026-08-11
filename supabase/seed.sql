insert into public.team_members (name, role, department, location, email, bio)
values
  (
    'Jordan Blake',
    'Senior Product Designer',
    'Design',
    'Austin, TX',
    'jordan.blake@example.com',
    'Jordan leads the design system team and has shipped design tooling used across every product surface.'
  ),
  (
    'Priya Nair',
    'Backend Engineer',
    'Engineering',
    'Remote',
    'priya.nair@example.com',
    'Priya works on the payments platform, focusing on reliability and API performance.'
  ),
  (
    'Sam Osei',
    'Customer Success Manager',
    'Support',
    'Toronto, ON',
    'sam.osei@example.com',
    'Sam is the main point of contact for the top 20 enterprise accounts and runs the quarterly QBRs.'
  );

insert into public.games (title, genre, release_year)
values
  ('Pac-Man', 'Maze', 1980),
  ('Galaga', 'Shooter', 1981),
  ('Donkey Kong', 'Platformer', 1981),
  ('Space Invaders', 'Shooter', 1978),
  ('Frogger', 'Arcade', 1981),
  ('Centipede', 'Shooter', 1981),
  ('Asteroids', 'Shooter', 1979),
  ('Dig Dug', 'Maze', 1982),
  ('Q*bert', 'Puzzle', 1982),
  ('Defender', 'Shooter', 1981),
  ('Joust', 'Platformer', 1982),
  ('Tempest', 'Shooter', 1981);

-- 60 players with randomly combined callsigns, seeded so the data is stable across resets.
select setseed(0.42);

insert into public.players (gamertag, country, joined_at)
select
  words.prefix || words.suffix || n::text,
  words.country,
  now() - (random() * interval '3 years')
from generate_series(1, 60) as n,
  lateral (
    select
      (array['Pixel', 'Turbo', 'Retro', 'Byte', 'Neon', 'Cosmic', 'Quantum', 'Volt', 'Nova', 'Ghost'])[1 + floor(random() * 10)::int] as prefix,
      (array['Hawk', 'Runner', 'Blaster', 'Fox', 'Ranger', 'Wolf', 'Striker', 'Comet', 'Rider', 'Ninja'])[1 + floor(random() * 10)::int] as suffix,
      (array['USA', 'Japan', 'UK', 'Canada', 'Germany', 'Brazil', 'Australia', 'South Korea'])[1 + floor(random() * 8)::int] as country
  ) as words;

-- 1,000 scores spread across every player and game combination.
insert into public.scores (player_id, game_id, score, combo, accuracy, played_at)
select
  (1 + floor(random() * 60))::bigint,
  (1 + floor(random() * 12))::bigint,
  (10 + floor(random() * 999990))::int,
  floor(random() * 500)::int,
  round((random() * 100)::numeric, 2),
  now() - (random() * interval '2 years')
from generate_series(1, 1000);

insert into public.orders (customer_name, item, status)
values
  ('Alex Kim', 'Margherita Pizza', 'received'),
  ('Jordan Lee', 'Pepperoni Pizza', 'preparing'),
  ('Morgan Chen', 'Caesar Salad', 'out_for_delivery');

insert into public.albums (artist, title, release_year)
values
  ('Nova Ridge', 'Static Bloom', 2018),
  ('Nova Ridge', 'Concrete Garden', 2020),
  ('Nova Ridge', 'Halflight', 2023);

insert into public.tour_dates (artist, city, venue, show_date)
values
  ('Nova Ridge', 'Austin', 'Mohawk', '2026-09-12'),
  ('Nova Ridge', 'Denver', 'Ogden Theatre', '2026-09-20'),
  ('Nova Ridge', 'Seattle', 'The Showbox', '2026-10-02'),
  ('Nova Ridge', 'Portland', 'Wonder Ballroom', '2026-10-05');
