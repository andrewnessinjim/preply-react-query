export interface PlantRow {
  id: number;
  name: string;
  category: string;
  price_cents: number;
  light: string;
}

export type TableFilter = Record<string, string | number>;

export interface QueryFnWidgetProps<TRow extends { id: number }> {
  title: string;
  queryKey: readonly unknown[];
  explanation: string;
  data: TRow[] | undefined;
  isLoading: boolean;
  isError: boolean;
  renderRow: (row: TRow) => string;
}
