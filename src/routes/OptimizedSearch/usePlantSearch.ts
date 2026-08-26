import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { plantSearchKeys } from "./searchKeys";
import type { PlantSearchRow } from "./types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(minMs: number, maxMs: number) {
  return sleep(minMs + Math.random() * (maxMs - minMs));
}

async function searchPlants(
  term: string,
  signal: AbortSignal,
): Promise<PlantSearchRow[]> {
  // The delay just stands in for realistic network latency, same as every
  // other demo's queryFn — it isn't wired to signal at all. abortSignal(signal)
  // on the Supabase call below is the only thing that needs to know about
  // cancellation: the moment it aborts, that promise rejects, and
  // Promise.all rejects right along with it without waiting for the delay.
  const [{ data, error }] = await Promise.all([
    supabase
      .from("plants")
      .select("id, name, category, price_cents")
      .or(`name.ilike.%${term}%,summary.ilike.%${term}%`)
      .order("name")
      .abortSignal(signal),
    randomDelay(1900, 2400),
  ]);
  if (error) throw error;
  return data;
}

function searchQueryFn({ queryKey, signal }: QueryFunctionContext) {
  const [, term] = queryKey as ReturnType<typeof plantSearchKeys.term>;
  return searchPlants(term, signal);
}

export function useSearchResults(term: string) {
  return useQuery({
    queryKey: plantSearchKeys.term(term),
    queryFn: searchQueryFn,
    enabled: term.length > 0,
  });
}
