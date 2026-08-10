import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";

export interface NewOrderInput {
  customerName: string;
  item: string;
  simulateFailure: boolean;
}

export interface PlacedOrder {
  id: number;
  customer_name: string;
  item: string;
  status: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function placeOrder(input: NewOrderInput): Promise<PlacedOrder> {
  await sleep(800); // stands in for real checkout / payment-processing latency

  if (input.simulateFailure) {
    throw new Error("Payment declined — card was rejected.");
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({ customer_name: input.customerName, item: input.item })
    .select("id, customer_name, item, status")
    .single();
  if (error) throw error;
  return data;
}

interface UsePlaceOrderCallbacks {
  onSuccess?: (order: PlacedOrder) => void;
  onError?: (error: Error) => void;
}

export function usePlaceOrder({ onSuccess, onError }: UsePlaceOrderCallbacks = {}) {
  return useMutation({
    mutationFn: placeOrder,
    onSuccess,
    onError,
  });
}
