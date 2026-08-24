import { QueryClient } from "@tanstack/react-query";

// Level 1: set once, when the QueryClient itself is constructed. Applies to
// every query on this client that doesn't say otherwise.
export const GLOBAL_STALE_TIME = 8_000;

// Level 2: set once per query-key prefix, after construction, via
// setQueryDefaults. Any query whose key *starts with* this prefix picks this
// up instead of the global default, no matter what follows the prefix.
export const CATALOG_PREFIX = ["plants", "catalog"] as const;
export const CATALOG_STALE_TIME = 45_000;

// Level 3: passed directly on one specific useQuery call (see
// useFeaturedPlant in usePlants.ts). It wins over both levels above, even
// though that query's key also starts with CATALOG_PREFIX.
export const FEATURED_STALE_TIME = 0;

// This demo gets its own QueryClient instance instead of reusing the app's
// shared one from main.tsx, so the defaultOptions and setQueryDefaults calls
// below only ever affect the four cards on this page.
export function createConfigLevelsQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: GLOBAL_STALE_TIME,
      },
    },
  });

  queryClient.setQueryDefaults(CATALOG_PREFIX, {
    staleTime: CATALOG_STALE_TIME,
  });

  return queryClient;
}
