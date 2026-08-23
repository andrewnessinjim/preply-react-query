export type SortableField = "name" | "category" | "price_cents";

export interface SortableItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  price_cents: number;
}

export interface UpdateItemInput {
  id: number;
  name: string;
  category: string;
  price_cents: number;
}

export interface ItemRowProps {
  item: SortableItem;
}
