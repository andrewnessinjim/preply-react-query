export interface ScoreRow {
  id: number;
  score: number;
  combo: number;
  accuracy: number;
  player_id: number;
}

export interface PlayerRow {
  id: number;
  gamertag: string;
  country: string;
}

export interface ScoreWithPlayer {
  score: ScoreRow;
  player: PlayerRow;
}

export interface CombinedPanelProps {
  simulateFailure: boolean;
}

export interface DependentPanelProps {
  simulateFailure: boolean;
}

export interface IntroProps {
  simulateFailure: boolean;
  onSimulateFailureChange: (simulateFailure: boolean) => void;
}
