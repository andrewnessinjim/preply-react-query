import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

const ACCOUNT_MANAGER_ID = 1;

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  bio: string;
}

export default function useAccountManager() {
  const {
    data: manager,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["team-member", ACCOUNT_MANAGER_ID],
    queryFn: async (): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", ACCOUNT_MANAGER_ID)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 10000
  });

  return { manager, isLoading, error };
}
