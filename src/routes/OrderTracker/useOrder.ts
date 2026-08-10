import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export const ORDER_ID = 1;
export const POLL_INTERVAL = 3000;

export type OrderStatus =
  | "received"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

export const ORDER_STATUSES: OrderStatus[] = [
  "received",
  "preparing",
  "out_for_delivery",
  "delivered",
];

export interface Order {
  id: number;
  customer_name: string;
  item: string;
  status: OrderStatus;
  updated_at: string;
}

const orderKey = ["order-status", ORDER_ID] as const;

export function useOrder() {
  return useQuery({
    queryKey: orderKey,
    queryFn: async (): Promise<Order> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", ORDER_ID)
        .single();
      if (error) throw error;
      return data;
    },
    refetchInterval: POLL_INTERVAL,
    refetchIntervalInBackground: true,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: OrderStatus) => {
      const { error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", ORDER_ID);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKey });
    },
  });
}
