import { queryOptions } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { PlantSummary, Plant } from "./types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const plantListOptions = queryOptions({
  queryKey: ["plants"],
  queryFn: async (): Promise<PlantSummary[]> => {
    const { data, error } = await supabase
      .from("plants")
      .select("id, name, category, price_cents, summary")
      .order("name");
    if (error) throw error;
    return data;
  },
});

// queryOptions() just returns a plain { queryKey, queryFn, ... } object —
// there's nothing hover-specific or detail-page-specific about it. The list
// page's onMouseEnter hands this straight to queryClient.prefetchQuery(),
// and the detail page hands the exact same object to useQuery(). Same key,
// same fetcher, same staleTime, because it's the same object, not two
// definitions that happen to agree today.
export function plantQueryOptions(plantId: number) {
  return queryOptions({
    queryKey: ["plant", plantId],
    queryFn: async (): Promise<Plant> => {
      // Stands in for a heavier detail-page lookup than the list row needed
      // (full care guide, light/water specifics) — slow enough that
      // prefetching it before the click actually matters.
      const [{ data, error }] = await Promise.all([
        supabase.from("plants").select("*").eq("id", plantId).single(),
        sleep(700),
      ]);
      if (error) throw error;
      return data;
    },
    // Without this, the data prefetchQuery just fetched is immediately
    // stale (staleTime defaults to 0), so mounting useQuery on click would
    // still fire a second background request right after the hover
    // already paid for one. This doesn't matter for the UX because the cached data from prefetching is used to render the component before making the background request. However, it wastes bandwidth
    staleTime: 30000,
  });
}

// Used by the Placeholder Data demo: the list row already has everything
// this shape needs except the three detail-only fields, so filling those
// with empty strings turns a PlantSummary into something that satisfies
// Plant well enough to render immediately. isPlaceholderData is what tells
// the UI these three fields are stand-ins, not real data, so it knows to
// show a skeleton instead of an empty light/water/care guide.
export function plantPlaceholderFromSummary(summary: PlantSummary): Plant {
  return { ...summary, light: "", water: "", care_guide: "" };
}
