import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { SortableField, SortableItem, UpdateItemInput } from "./types";

// A small, fixed set of rows — not a top-N slice of the full table — so an
// edited row is always still one of the rows being rendered. It only ever
// changes position, never disappears off a cutoff, which is what makes the
// reorder actually visible.
const ITEM_IDS = [1, 2, 3, 4, 5, 6];

export const SORTABLE_FIELDS: { value: SortableField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "category", label: "Category" },
  { value: "price_cents", label: "Price" },
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Stands in for real network latency, which isn't a fixed number — a random
// spread within a range, so consecutive fetches/saves don't all resolve at
// the same suspiciously round moment.
function randomDelay(minMs: number, maxMs: number) {
  return sleep(minMs + Math.random() * (maxMs - minMs));
}

function sortedItemsOptions(sortField: SortableField) {
  return queryOptions({
    queryKey: ["sorted-items", sortField],
    queryFn: async (): Promise<SortableItem[]> => {
      const [{ data, error }] = await Promise.all([
        supabase
          .from("inventory_items")
          .select("id, sku, name, category, price_cents")
          .in("id", ITEM_IDS)
          .order(sortField, { ascending: true }),
        randomDelay(400, 1200),
      ]);
      if (error) throw error;
      return data;
    },
    placeholderData: keepPreviousData
  });
}

export function useSortedItems(sortField: SortableField) {
  return useQuery(sortedItemsOptions(sortField));
}

async function updateItem(input: UpdateItemInput): Promise<void> {
  const [{ error }] = await Promise.all([
    supabase
      .from("inventory_items")
      .update({
        name: input.name,
        category: input.category,
        price_cents: input.price_cents,
      })
      .eq("id", input.id),
    randomDelay(500, 1400),
  ]);
  if (error) throw error;
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,
    // Editing any field can move this row to a different position under any
    // of the 3 sort orders, not just whichever one is currently on screen.
    // There's no single "it moved to index 2" patch that's valid for all
    // three at once, so unlike Manual/Partial Cache Update, the cache gets
    // invalidated instead of hand-edited.
    onSuccess: () => {
      // invalidateQueries matches by key *prefix* unless you pass
      // exact: true, so this one call marks all 3 — ["sorted-items",
      // "name"], ["sorted-items", "category"], ["sorted-items",
      // "price_cents"] — stale at once; no need to list them out.
      // Returning it is what makes that matter: useMutation awaits
      // whatever onSuccess returns before it settles, so the mutation
      // stays pending until every one of those refetches has actually
      // landed — not just until the PATCH request resolves.
      return queryClient.invalidateQueries({ queryKey: ["sorted-items"] });
    },
  });
}
