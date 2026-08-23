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
