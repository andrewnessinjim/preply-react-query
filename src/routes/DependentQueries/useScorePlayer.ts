import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { ScoreRow, PlayerRow, ScoreWithPlayer } from "./types";

export const SCORE_ID = 1;

// Stands in for a related lookup that's slower than the first request, so
// the "single loading state" tradeoff is visible without squinting.
const PLAYER_FETCH_DELAY = 1200;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchScore(): Promise<ScoreRow> {
  const { data, error } = await supabase
    .from("scores")
    .select("id, score, combo, accuracy, player_id")
    .eq("id", SCORE_ID)
    .single();
  if (error) throw error;
  return data;
}

async function fetchPlayer(
  playerId: number,
  simulateFailure: boolean,
): Promise<PlayerRow> {
  await sleep(PLAYER_FETCH_DELAY);
  if (simulateFailure) {
    throw new Error("Player service is down");
  }
  const { data, error } = await supabase
    .from("players")
    .select("id, gamertag, country")
    .eq("id", playerId)
    .single();
  if (error) throw error;
  return data;
}

export function useScore() {
  return useQuery({
    queryKey: ["score", SCORE_ID],
    queryFn: fetchScore,
    retry: false,
  });
}

export function usePlayer(
  playerId: number | undefined,
  simulateFailure: boolean,
) {
  return useQuery({
    queryKey: ["player", playerId],
    queryFn: () => fetchPlayer(playerId!, simulateFailure),
    enabled: playerId !== undefined,
    retry: false,
  });
}

export function useScoreWithPlayer(simulateFailure: boolean) {
  return useQuery({
    queryKey: ["score-with-player", SCORE_ID],
    queryFn: async (): Promise<ScoreWithPlayer> => {
      const score = await fetchScore();
      const player = await fetchPlayer(score.player_id, simulateFailure);
      return { score, player };
    },
    retry: false,
  });
}
