import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  bio: string;
}

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
