import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { SortField, InventoryPage } from "./types";

export const PAGE_SIZE = 10;

export const SORT_FIELDS: { value: SortField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "category", label: "Category" },
  { value: "price_cents", label: "Price" },
  { value: "stock", label: "Stock" },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function inventoryPageOptions(page: number, sortField: SortField) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  return queryOptions({
    queryKey: ["inventory", sortField, page],
    queryFn: async (): Promise<InventoryPage> => {
      // Deliberately slow, standing in for a real warehouse table with
      // enough rows that a query planner can't just hand it back for free —
      // slow enough that switching pages or sort fields with no
      // placeholderData would flash a loading state on every click.
      const [{ data, error, count }] = await Promise.all([
        supabase
          .from("inventory_items")
          .select("id, sku, name, category, price_cents, stock", {
            count: "exact",
          })
          .order(sortField, { ascending: true })
          .range(from, to),
        sleep(450),
      ]);
      if (error) throw error;
      return { items: data ?? [], totalCount: count ?? 0 };
    },
    // Every page/sort combination is its own queryKey, so without this a
    // page or sort change would drop straight to a loading state — there's
    // no earlier fetch under that exact key to show yet. keepPreviousData
    // is shorthand for placeholderData: (previousData) => previousData: it
    // reaches into whatever the *last* query resolved to (a different page,
    // a different sort) and keeps rendering those rows, stale as they are,
    // until the new key's real data lands and replaces them.
    placeholderData: keepPreviousData,
    // Without this, a page prefetched ahead of time is immediately stale
    // (staleTime defaults to 0) — landing on it would still show it
    // instantly from cache, but mounting would also kick off a redundant
    // background refetch of a page that was just fetched moments ago.
    staleTime: 5000,
  });
}
