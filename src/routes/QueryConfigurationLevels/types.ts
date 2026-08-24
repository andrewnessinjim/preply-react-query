import type { UseQueryResult } from "@tanstack/react-query";

export interface PlantSummary {
  id: number;
  name: string;
  category: string;
  price_cents: number;
}

export type PlantCategory = "Succulent" | "Tropical";

export interface ConfigWidgetProps {
  title: string;
  level: string;
  queryKey: readonly unknown[];
  staleTimeMs: number;
  explanation: string;
  result: UseQueryResult<PlantSummary[], Error>;
  now: number;
}
