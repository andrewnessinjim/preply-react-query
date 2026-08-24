import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { CATALOG_PREFIX, FEATURED_STALE_TIME } from "./queryClient";
import type { PlantCategory, PlantSummary } from "./types";

async function fetchAllPlants(): Promise<PlantSummary[]> {
  const { data, error } = await supabase
    .from("plants")
    .select("id, name, category, price_cents")
    .order("name");
  if (error) throw error;
  return data;
}

async function fetchPlantsByCategory(
  category: PlantCategory,
): Promise<PlantSummary[]> {
  const { data, error } = await supabase
    .from("plants")
    .select("id, name, category, price_cents")
    .eq("category", category)
    .order("name");
  if (error) throw error;
  return data;
}

async function fetchFeaturedPlant(): Promise<PlantSummary[]> {
  const { data, error } = await supabase
    .from("plants")
    .select("id, name, category, price_cents")
    .eq("name", "Monstera Deliciosa");
  if (error) throw error;
  return data;
}

// No staleTime here at all — falls through to the client's
// defaultOptions.queries.staleTime (Level 1).
export function useAllPlants() {
  return useQuery({
    queryKey: ["plants"],
    queryFn: fetchAllPlants,
  });
}

// No staleTime here either, but the key starts with CATALOG_PREFIX, so
// setQueryDefaults(CATALOG_PREFIX, ...) supplies it (Level 2) — matched by
// prefix, not by the exact key, so every category shares one default.
export function usePlantCategory(category: PlantCategory) {
  return useQuery({
    queryKey: [...CATALOG_PREFIX, category],
    queryFn: () => fetchPlantsByCategory(category),
  });
}

// Same CATALOG_PREFIX as usePlantCategory, but staleTime is passed directly
// on this call (Level 3) — the most specific option always wins, so this
// ignores the fuzzy default the hook above relies on.
export function useFeaturedPlant() {
  return useQuery({
    queryKey: [...CATALOG_PREFIX, "featured"],
    queryFn: fetchFeaturedPlant,
    staleTime: FEATURED_STALE_TIME,
  });
}
