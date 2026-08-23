import type { UseQueryResult } from "@tanstack/react-query";

export interface PlayerRosterEntry {
  id: number;
  gamertag: string;
}

export interface PlayerStats {
  id: number;
  gamertag: string;
  country: string;
  gamesPlayed: number;
  bestScore: number;
  avgAccuracy: number;
}

export interface PlayerStatsComparison {
  results: UseQueryResult<PlayerStats>[];
  topScoreId: number | null;
}
