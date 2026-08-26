import { QueryClient, type QueryFunctionContext } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { TableFilter } from "./types";

// The one default that can't exist: TanStack Query's own types omit
// `queryKey` from both `defaultOptions.queries` and `setQueryDefaults`'s
// options — there's no version of this file that "defaults" a key, only
// ever a queryFn, staleTime, retry, etc. That's not an oversight: defaults
// are looked up *by* queryKey (setQueryDefaults(prefix, options) matches
// prefixes of it), so the key has to already exist before any lookup can
// happen. It can't also be the thing the lookup produces.
//
//   const bad: DefaultOptions["queries"] = { queryKey: ["nope"] };
//   //                                        ^^^^^^^^ Object literal may only
//   //                                        specify known properties, and
//   //                                        'queryKey' does not exist in
//   //                                        type '...'
//
// A default *queryFn*, on the other hand, is completely ordinary — as long
// as it can figure out what to fetch purely from the queryKey it's handed.
// PLANTS_KEY is both the fuzzy-match prefix passed to setQueryDefaults and
// the table name itself, no separate "admin" wrapper layer needed. Any
// query whose key starts with ["plants"] reads the rest as an optional
// filter: [table, filter?], and fetches queryKey[0] filtered by
// queryKey[1].
export const PLANTS_KEY = ["plants"] as const;

async function defaultQueryFn({ queryKey }: QueryFunctionContext) {
  const [table, filter] = queryKey as [string, TableFilter | undefined];

  let query = supabase.from(table).select("*");
  if (filter) {
    for (const [column, value] of Object.entries(filter)) {
      query = query.eq(column, value);
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Isolated to this page for the same reason as the Query Configuration
// Levels demo: even fuzzy-matched, setQueryDefaults writes into the client
// it's called on, so this gets its own instead of touching the shared one
// the rest of the site's demos use.
export function createDefaultQueryFnClient() {
  const queryClient = new QueryClient();

  // Fuzzy-matched, like setQueryDefaults(prefix, { staleTime }) in the Query
  // Configuration Levels demo — but the option being defaulted here is
  // queryFn. Only queries whose key starts with PLANTS_KEY pick this up;
  // anything else (Server Clock included) still needs its own queryFn, the
  // same as it would on any other QueryClient.
  queryClient.setQueryDefaults(PLANTS_KEY, {
    queryFn: defaultQueryFn,
  });

  return queryClient;
}
