import { useQuery } from "@tanstack/react-query";
import { PLANTS_KEY } from "./queryClient";
import type { PlantRow } from "./types";

// None of these three pass a queryFn — setQueryDefaults(PLANTS_KEY, ...) in
// queryClient.ts supplies one for any query whose key starts with
// ["plants"], reading queryKey[1] as an optional filter. Same function
// underneath, three different keys. The row type has to be given
// explicitly as a generic here, since a shared queryFn can't infer it the
// way an inline one normally would.

export function useAllPlants() {
  return useQuery<PlantRow[]>({
    queryKey: PLANTS_KEY,
  });
}

export function usePlantsByCategory(category: string) {
  return useQuery<PlantRow[]>({
    queryKey: [...PLANTS_KEY, { category }],
  });
}

export function usePlantById(id: number) {
  return useQuery<PlantRow[]>({
    queryKey: [...PLANTS_KEY, { id }],
  });
}

// The filter object isn't limited to one column — defaultQueryFn just
// Object.entries()s whatever's here and .eq()s each one, so this key ANDs
// together two columns instead of one.
export function usePlantsByCategoryAndLight(category: string, light: string) {
  return useQuery<PlantRow[]>({
    queryKey: [...PLANTS_KEY, { category, light }],
  });
}

// This key doesn't start with PLANTS_KEY, so setQueryDefaults never touches
// it — it has to bring its own ordinary queryFn, exactly like it would if
// the plants default queryFn didn't exist at all.
export function useServerClock() {
  return useQuery({
    queryKey: ["server-clock"],
    queryFn: () => new Date().toLocaleTimeString(),
    refetchInterval: 1000,
  });
}
