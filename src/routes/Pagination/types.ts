export type SortField = "name" | "category" | "price_cents" | "stock";

export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  price_cents: number;
  stock: number;
}

export interface InventoryPage {
  items: InventoryItem[];
  totalCount: number;
}
