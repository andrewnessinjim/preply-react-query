import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { TeamMember } from "./types";

export const GC_MEMBER_ID = 1;
export const GC_TIME = 5000;
export const GC_STALE_TIME = 60000;

export const gcProfileKey = ["gc-demo-profile", GC_MEMBER_ID] as const;

export default function useGcProfile() {
  return useQuery({
    queryKey: gcProfileKey,
    queryFn: async (): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", GC_MEMBER_ID)
        .single();
      if (error) throw error;
      return data;
    },
    gcTime: GC_TIME,
    staleTime: GC_STALE_TIME,
  });
}
