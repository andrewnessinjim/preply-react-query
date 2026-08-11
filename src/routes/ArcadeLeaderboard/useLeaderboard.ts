import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export type SortField = "score" | "combo" | "accuracy" | "played_at";

export interface ScoreRow {
  id: number;
  score: number;
  combo: number;
  accuracy: number;
  played_at: string;
  players: { gamertag: string } | null;
  games: { title: string } | null;
}

export default function useLeaderboard(sortField: SortField) {
  return useQuery({
    queryKey: ["scores", sortField],
    queryFn: async (): Promise<ScoreRow[]> => {
      const { data, error } = await supabase
        .from("scores")
        .select(
          "id, score, combo, accuracy, played_at, players(gamertag), games(title)",
        )
        .order(sortField, { ascending: false })
        .limit(12);
      if (error) throw error;
      return data as unknown as ScoreRow[];
    },
  });
}
