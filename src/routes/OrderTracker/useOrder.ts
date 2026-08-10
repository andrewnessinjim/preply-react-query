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

export const orderKey = ["order-status", ORDER_ID] as const;

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

export interface UpdateOrderDetailsInput {
  customerName: string;
  item: string;
}

export function useUpdateOrderDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateOrderDetailsInput): Promise<Order> => {
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
      queryClient.setQueryData(orderKey, updatedOrder);
    },
  });
}
