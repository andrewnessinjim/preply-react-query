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

insert into public.plants (name, category, price_cents, light, water, summary, care_guide)
values
  (
    'Golden Pothos',
    'Low Light',
    1800,
    'Low to bright indirect',
    'Every 1-2 weeks, let soil dry out',
    'A trailing vine that forgives almost any spot you put it in.',
    'One of the most forgiving houseplants around. Let the top two inches of soil dry out between waterings, and don''t worry if you forget a week — it recovers fast. Trailing vines can stretch several feet, so give it a shelf or a hanging basket. Trim leggy stems to encourage fuller growth, and wipe the leaves occasionally so they can photosynthesize properly.'
  ),
  (
    'Snake Plant',
    'Low Light',
    2400,
    'Low to bright indirect',
    'Every 3-4 weeks',
    'Stiff, upright leaves that thrive on neglect.',
    'Snake plants store water in their thick leaves, so overwatering is the only real way to hurt one. Water deeply, then let the soil dry out completely before watering again — in low light that can mean once a month. Tolerates dust, dry air, and being ignored for a week on vacation. A well-draining pot is more important than a sunny window.'
  ),
  (
    'Fiddle Leaf Fig',
    'Tropical',
    4800,
    'Bright indirect',
    'Weekly, once top inch is dry',
    'Large violin-shaped leaves that make a statement in any room.',
    'Wants consistency more than anything else — same spot, same watering schedule, no cold drafts from doors or AC vents. Rotate the pot a quarter turn each week so it grows evenly toward the light instead of leaning. Brown edges usually mean underwatering or low humidity; dropped leaves usually mean it got moved or chilled. Dust the broad leaves so they can breathe.'
  ),
  (
    'Monstera Deliciosa',
    'Tropical',
    3600,
    'Bright indirect',
    'Weekly, once top inch is dry',
    'Iconic split leaves that get more dramatic as the plant matures.',
    'Young plants have solid leaves; the signature splits and holes only appear once the plant matures and gets enough light, so don''t expect Instagram leaves on day one. Give it something to climb — a moss pole or trellis — and it will grow larger, more deeply split leaves than it would sprawling on a shelf. Wipe leaves monthly and rotate toward the light every few weeks.'
  ),
  (
    'ZZ Plant',
    'Low Light',
    2200,
    'Low to bright indirect',
    'Every 2-3 weeks',
    'Glossy, waxy leaves on a plant that barely needs you.',
    'Grows from thick rhizomes that store water and nutrients, which is why it tolerates missed waterings better than almost anything else in this shop. Let the soil dry out fully between waterings — soggy soil is the only thing that reliably kills a ZZ plant. Handles office fluorescent light just fine, making it a favorite for windowless desks.'
  ),
  (
    'String of Pearls',
    'Succulent',
    1600,
    'Bright indirect to direct',
    'Every 2-3 weeks',
    'Bead-like trailing leaves, best shown off in a hanging pot.',
    'A true succulent — the round, pea-shaped leaves store water, so treat it like a cactus: water thoroughly, then wait until the soil is bone dry before watering again. Needs more light than most trailing houseplants; a south-facing window is ideal. Overwatering shows up fast as shriveled, translucent pearls that drop off the strand.'
  ),
  (
    'Echeveria Elegans',
    'Succulent',
    1400,
    'Bright direct',
    'Every 2-3 weeks',
    'A classic rosette succulent in soft blue-green tones.',
    'Wants as much direct sun as you can give it — a bright windowsill is the minimum, an outdoor spot in warm months is even better. Water at the soil line and avoid getting the rosette wet, since trapped water in the leaves can cause rot. Stretching toward the window with wide gaps between leaves is a sign it needs more light, not more water.'
  ),
  (
    'Peace Lily',
    'Air Purifying',
    2600,
    'Low to medium indirect',
    'Weekly, once it starts drooping slightly',
    'Glossy leaves and white blooms that double as a built-in watering reminder.',
    'One of the few plants that tells you exactly when it''s thirsty — the leaves droop noticeably, then perk back up within hours of a good watering. That makes it nearly impossible to underwater by accident, though it''s just as easy to overwater if you water on a fixed schedule instead of watching the leaves. Keep it out of direct sun, which scorches the leaf tips.'
  ),
  (
    'Boston Fern',
    'Tropical',
    2000,
    'Medium indirect',
    '2-3 times a week',
    'Feathery fronds that want more humidity than your average houseplant.',
    'The trickiest plant in this shop for a dry apartment — it wants consistently moist soil and humidity well above what most homes have in winter. A bathroom with a window, a pebble tray, or a regular misting routine all help. Crispy fronds mean the air is too dry, not that it needs more water in the pot. Trim dead fronds at the base to keep new growth coming.'
  );
