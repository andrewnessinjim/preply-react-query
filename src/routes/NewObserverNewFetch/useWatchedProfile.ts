import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export const WATCHED_MEMBER_ID = 3;
export const WATCHED_STALE_TIME = 6000;

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  bio: string;
}

export const watchedProfileKey = ["watched-profile", WATCHED_MEMBER_ID] as const;

export default function useWatchedProfile() {
  return useQuery({
    queryKey: watchedProfileKey,
    queryFn: async (): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", WATCHED_MEMBER_ID)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: WATCHED_STALE_TIME,
  });
}
