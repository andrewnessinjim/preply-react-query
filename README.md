# React Query Examples — Preply Teaching Material

## About this repo

Aside from the React Query code itself, everything else in this repo (setup, scaffolding, surrounding boilerplate) is AI-generated. These samples are teaching aids for the private React Query classes I teach at [Preply](https://preply.com/en/tutor/6274742) — they're meant to be walked through together during a lesson, not to be self-explanatory on their own.

The examples here are inspired by [ui.dev](https://ui.dev)'s paid React Query course, which is where I learned much of this material — if you want a structured course, I'd encourage you to check it out.

Everyone learns differently, though. If you'd rather work through a paid course on your own or learn 1:1 with a tutor, go with whichever fits how you learn best — both are worth considering.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (for `npm`)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) running — the Supabase CLI uses it to run local Postgres, Auth, Studio, etc.

> Tested with `Node 24.13.1`, `npm 11.8.0`, and `Docker 28.0.1`.

### 1. Install dependencies

```sh
npm install
```

### 2. Start Supabase locally

The Supabase CLI is included as a dev dependency, so no global install is needed:

```sh
npx supabase start
```

This spins up local Postgres, Auth, Storage, and Studio in Docker. Once it finishes, it prints an `API URL` and an `anon key` — you'll need both in the next step. (In the Supabase web console this same key is labeled **Publishable key** instead of `anon key` — they're the same thing.) You can reopen these values at any time with:

```sh
npx supabase status
```

Supabase Studio (a local dashboard for browsing tables and data) is available at [http://127.0.0.1:54323](http://127.0.0.1:54323).

### 3. Configure environment variables

Copy the example env file and fill in the values from `npx supabase start`:

```sh
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<anon key from `npx supabase start`>
```

### 4. Run the app

```sh
npm run dev
```

The app will be available at the URL Vite prints (default [http://localhost:5173](http://localhost:5173)).

### Stopping Supabase

```sh
npx supabase stop
```

### Reset Supabase DB
If you would like to reset the db after pulling new example or after experimenting, you can use the following command:

```sh
npx supabase reset db
```
