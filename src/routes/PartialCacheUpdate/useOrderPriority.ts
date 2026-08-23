import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { OrderPriority, TogglePriorityInput } from "./types";

const ORDER_ID = 1;

const orderPriorityKey = ["order-priority", ORDER_ID] as const;

export function useOrderPriority() {
  return useQuery({
    queryKey: orderPriorityKey,
    queryFn: async (): Promise<OrderPriority> => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, customer_name, item, priority")
        .eq("id", ORDER_ID)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

async function togglePriority(input: TogglePriorityInput): Promise<void> {
  // Deliberately no .select() here. A flag toggle like "mark as priority" is
  // the kind of endpoint you want to be as cheap as a heartbeat — a
  // fire-and-forget PATCH that acks with nothing, not a full row round trip.
  // That's realistic (GitHub's star endpoint replies 204 No Content), and it
  // means the mutation truly has no updated row to hand the cache.
  const { error } = await supabase
    .from("orders")
    .update({ priority: input.priority })
    .eq("id", ORDER_ID);
  if (error) throw error;
}

export function useTogglePriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePriority,
    // The second parameter to the onSuccess callback is the input to the mutationFn
    onSuccess: (_data, variables) => {
      // There's no updated row in `data` to write in directly. Instead we
      // read the previous cache value and patch just the field we know we
      // changed — `variables` is exactly what we sent the server, so it's
      // the only source of truth we have left for what "priority" is now.
      queryClient.setQueryData(orderPriorityKey, (previousData?: OrderPriority) =>
        previousData && { ...previousData, priority: variables.priority },
      );
    },
  });
}
