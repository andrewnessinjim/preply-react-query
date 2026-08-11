import { useQuery } from "@tanstack/react-query";
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

export function useAlbums() {
  return useQuery({
    queryKey: ["artist-albums", ARTIST],
    queryFn: async (): Promise<Album[]> => {
      // The request itself fires immediately below — Promise.all just holds
      // the queryFn open until whichever finishes last: the real response or
      // this artificial delay, standing in for real network latency without
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
    },
  });
}

export interface TourDate {
  id: number;
  city: string;
  venue: string;
  show_date: string;
}

export function useTourDates() {
  return useQuery({
    queryKey: ["artist-tour-dates", ARTIST],
    queryFn: async (): Promise<TourDate[]> => {
      // Deliberately much slower than the album catalog — a live events
      // lookup against a ticketing platform is realistically heavier than a
      // catalog read, and that gap is the whole point of this demo.
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
    },
  });
}
