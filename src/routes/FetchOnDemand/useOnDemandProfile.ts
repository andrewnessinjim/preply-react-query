import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { TeamMember } from "./types";

export default function useOnDemandProfile(memberId: number | null) {
  return useQuery({
    queryKey: ["on-demand-profile", memberId],
    queryFn: async (): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", memberId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: memberId !== null,
  });
}
