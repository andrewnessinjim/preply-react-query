import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

const ORDER_ID = 1;

export interface OrderDetails {
  id: number;
  customer_name: string;
  item: string;
  status: string;
  updated_at: string;
}

const orderDetailsKey = ["order-details", ORDER_ID] as const;

export function useOrderDetails() {
  return useQuery({
    queryKey: orderDetailsKey,
    queryFn: async (): Promise<OrderDetails> => {
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

export interface UpdateOrderDetailsInput {
  customerName: string;
  item: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    onSuccess: (updatedOrder) => {
      // No invalidateQueries here — the update already returned the full,
      // current row, so we hand it straight to the cache instead of asking
      // the database to confirm what we just told it.
      queryClient.setQueryData(orderDetailsKey, updatedOrder);
    },
  });
}
