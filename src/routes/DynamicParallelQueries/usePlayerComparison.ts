import {
  useQueries,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type {
  PlayerRosterEntry,
  PlayerStats,
  PlayerStatsComparison,
} from "./types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// A cheap picker list — just id and gamertag for a handful of players — so
// there's something to check boxes against without paying for anyone's
// full stats before you've picked them.
export function usePlayerRoster() {
  return useQuery({
    queryKey: ["player-roster-picker"],
    queryFn: async (): Promise<PlayerRosterEntry[]> => {
      const { data, error } = await supabase
        .from("players")
        .select("id, gamertag")
        .order("id")
        .limit(15);
      if (error) throw error;
      return data;
    },
  });
}

async function fetchPlayerStats(playerId: number): Promise<PlayerStats> {
  await sleep(600); // stands in for a heavier per-player aggregation lookup

  const [{ data: player, error: playerError }, { data: scores, error: scoresError }] =
    await Promise.all([
      supabase
        .from("players")
        .select("id, gamertag, country")
        .eq("id", playerId)
        .single(),
      supabase.from("scores").select("score, accuracy").eq("player_id", playerId),
    ]);
  if (playerError) throw playerError;
  if (scoresError) throw scoresError;

  const gamesPlayed = scores.length;
  const bestScore = scores.reduce((max, row) => Math.max(max, row.score), 0);
  const avgAccuracy =
    gamesPlayed === 0
      ? 0
      : Math.round(
          (scores.reduce((sum, row) => sum + row.accuracy, 0) / gamesPlayed) * 100,
        ) / 100;

  return {
    id: player.id,
    gamertag: player.gamertag,
    country: player.country,
    gamesPlayed,
    bestScore,
    avgAccuracy,
  };
}

// Defined outside the hook so it's a stable reference across renders, same
// reason as Combined Parallel Queries' combine function — an inline arrow
// here would hand back a brand new object every time and defeat the
// memoization TanStack Query does internally.
function combinePlayerStats(
  results: UseQueryResult<PlayerStats>[],
): PlayerStatsComparison {
  const loaded = results
    .map((result) => result.data)
    .filter((data): data is PlayerStats => Boolean(data));

  const topScoreId =
    loaded.length > 0
      ? loaded.reduce((best, stats) =>
          stats.bestScore > best.bestScore ? stats : best,
        ).id
      : null;

  return { results, topScoreId };
}

// One query per checked player — the array TanStack Query sees genuinely
// grows and shrinks as `selectedIds` changes. You could dodge the Rules of
// Hooks by extracting a <PlayerStatCard playerId={id} /> component and
// letting each one call its own useQuery — that's valid, and simpler than
// this, right up until something needs to see every result at once. That's
// what combine is for here: it reduces the whole results array down to a
// topScoreId — the leaderboard-style highlight across whichever players
// have loaded so far — before this hook ever hands anything back to the
// component. Independent child components, each hiding its own fetch,
// couldn't compute that without lifting their data back up by hand.
export function usePlayerStats(selectedIds: number[]) {
  return useQueries({
    queries: selectedIds.map((id) => ({
      queryKey: ["player-stats", id],
      queryFn: () => fetchPlayerStats(id),
    })),
    combine: combinePlayerStats,
  });
}
