export type OrderStatus =
  | "received"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

export interface Order {
  id: number;
  customer_name: string;
  item: string;
  status: OrderStatus;
  updated_at: string;
}

export interface OrderStepperProps {
  status: OrderStatus;
}
