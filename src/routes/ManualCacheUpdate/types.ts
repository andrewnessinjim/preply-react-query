export interface OrderDetails {
  id: number;
  customer_name: string;
  item: string;
  status: string;
  updated_at: string;
}

export interface UpdateOrderDetailsInput {
  customerName: string;
  item: string;
}
