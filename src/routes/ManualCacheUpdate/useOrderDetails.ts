import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { OrderDetails, UpdateOrderDetailsInput } from "./types";

const ORDER_ID = 1;

const orderDetailsKey = ["order-details", ORDER_ID] as const;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useOrderDetails() {
  return useQuery({
    queryKey: orderDetailsKey,
    queryFn: async (): Promise<OrderDetails> => {
      await sleep(1700); // stands in for real network latency

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", ORDER_ID)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateOrderDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateOrderDetailsInput): Promise<OrderDetails> => {
      await sleep(1800); // stands in for real network latency, so the pending state is visible

      const { data, error } = await supabase
        .from("orders")
        .update({ customer_name: input.customerName, item: input.item })
        .eq("id", ORDER_ID)
        .select("id, customer_name, item, status, updated_at")
        .single();
      if (error) throw error;
      return data;
    },

    // React Query gives the return value of the mutationFn as the first parameter for the success callback
    onSuccess: (updatedOrder) => {
      // No invalidateQueries here — the update already returned the full,
      // current row, so we hand it straight to the cache instead of asking
      // the database to confirm what we just told it.
      queryClient.setQueryData(orderDetailsKey, updatedOrder);
    },
  });
}
