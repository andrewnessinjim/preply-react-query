import { useQueries, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

// albums and tour_dates aren't linked by a foreign key to each other — each
// just carries this same artist name, the way a GitHub org's members and
// repos are both scoped to an org id without referencing one another
// directly. In a real system these would likely come from two different
// services entirely: a music catalog and a ticketing/events platform.
const ARTIST = "Nova Ridge";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Album {
  id: number;
  title: string;
  release_year: number;
}

async function fetchAlbums(): Promise<Album[]> {
  // The request itself fires immediately below — Promise.all just holds
  // this open until whichever finishes last: the real response or this
  // artificial delay, standing in for real network latency without
  // delaying when the request actually goes out.
  const [{ data, error }] = await Promise.all([
    supabase
      .from("albums")
      .select("id, title, release_year")
      .eq("artist", ARTIST)
      .order("release_year"),
    sleep(500),
  ]);
  if (error) throw error;
  return data;
}

export interface TourDate {
  id: number;
  city: string;
  venue: string;
  show_date: string;
}

async function fetchTourDates(): Promise<TourDate[]> {
  // Deliberately much slower than the album catalog — a live events lookup
  // against a ticketing platform is realistically heavier than a catalog
  // read, and that gap is the whole point of these demos.
  const [{ data, error }] = await Promise.all([
    supabase
      .from("tour_dates")
      .select("id, city, venue, show_date")
      .eq("artist", ARTIST)
      .order("show_date"),
    sleep(2200),
  ]);
  if (error) throw error;
  return data;
}

// --- Parallel Queries: two independent queries, each its own cache entry ---

export function useAlbums() {
  return useQuery({
    queryKey: ["artist-albums", ARTIST],
    queryFn: fetchAlbums,
  });
}

export function useTourDates() {
  return useQuery({
    queryKey: ["artist-tour-dates", ARTIST],
    queryFn: fetchTourDates,
  });
}

// --- Combined Parallel Queries: same two fetches, one query ---

export interface ArtistCatalog {
  albums: Album[];
  tourDates: TourDate[];
}

export function useAlbumsAndTourDates() {
  return useQuery({
    queryKey: ["artist-catalog-combined", ARTIST],
    queryFn: async (): Promise<ArtistCatalog> => {
      // Both fetches still fire immediately and in parallel — Promise.all
      // just waits for both to settle before this one queryFn resolves.
      // That's what collapses two isLoading flags (and two error states)
      // into one: TanStack Query only ever sees a single query here, so
      // there's only ever a single pending/success/error to report.
      const [albums, tourDates] = await Promise.all([
        fetchAlbums(),
        fetchTourDates(),
      ]);
      return { albums, tourDates };
    },
  });
}

// Stands in for some unrelated widget elsewhere on the site — a
// "Discography" module in a sidebar, say — that only ever wanted the album
// list on its own. It calls the exact same fetchAlbums() the combined query
// already ran, but under a different query key, so TanStack Query has no
// way to know the data it wants is already sitting in cache.
export function useAlbumsOnly() {
  return useQuery({
    queryKey: ["artist-albums-standalone", ARTIST],
    queryFn: fetchAlbums,
  });
}

// --- Best of Both Worlds: useQueries + combine ---

export interface CombinedArtistResult {
  albums: Album[] | undefined;
  tourDates: TourDate[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

// Defined outside the hook so it's a stable reference across renders —
// TanStack Query re-runs combine whenever any underlying query result
// changes, and an inline arrow function here would defeat the memoization
// it does internally to avoid handing back a brand new object every time.
function combineArtistResults([albumsResult, tourDatesResult]: [
  UseQueryResult<Album[]>,
  UseQueryResult<TourDate[]>,
]): CombinedArtistResult {
  return {
    albums: albumsResult.data,
    tourDates: tourDatesResult.data,
    isLoading: albumsResult.isLoading || tourDatesResult.isLoading,
    isError: albumsResult.isError || tourDatesResult.isError,
  };
}

export function useAlbumsAndTourDatesQueries() {
  return useQueries({
    // Same query keys as useAlbums()/useTourDates() above — on purpose.
    // These are the same two cache entries, not a third one, so anything
    // else in the app already using those hooks shares this data instead
    // of re-fetching it.
    queries: [
      { queryKey: ["artist-albums", ARTIST], queryFn: fetchAlbums },
      { queryKey: ["artist-tour-dates", ARTIST], queryFn: fetchTourDates },
    ],
    combine: combineArtistResults,
  });
}
