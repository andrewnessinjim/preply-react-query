import { useQuery } from "@tanstack/react-query";
import { ADMIN_PREFIX } from "./queryClient";
import type { PlantRow, TeamMemberRow } from "./types";

// None of these three pass a queryFn — setQueryDefaults(ADMIN_PREFIX, ...)
// in queryClient.ts supplies one for any query whose key starts with that
// prefix, reading the rest of the key to decide which Supabase table and
// filter to hit. Same function underneath, three different keys. The row
// type has to be given explicitly as a generic here, since a shared queryFn
// can't infer it the way an inline one normally would.

export function useAllPlants() {
  return useQuery<PlantRow[]>({
    queryKey: [...ADMIN_PREFIX, "plants"],
  });
}

export function usePlantsByCategory(category: string) {
  return useQuery<PlantRow[]>({
    queryKey: [...ADMIN_PREFIX, "plants", { category }],
  });
}

export function useTeamMember(id: number) {
  return useQuery<TeamMemberRow[]>({
    queryKey: [...ADMIN_PREFIX, "team_members", { id }],
  });
}

// This key doesn't start with ADMIN_PREFIX, so setQueryDefaults never
// touches it — it has to bring its own ordinary queryFn, exactly like it
// would if the admin panel's default queryFn didn't exist at all.
export function useServerClock() {
  return useQuery({
    queryKey: ["server-clock"],
    queryFn: () => new Date().toLocaleTimeString(),
    refetchInterval: 1000,
  });
}
