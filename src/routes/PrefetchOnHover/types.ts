export interface PlantSummary {
  id: number;
  name: string;
  category: string;
  price_cents: number;
  summary: string;
}

export interface Plant extends PlantSummary {
  light: string;
  water: string;
  care_guide: string;
}
