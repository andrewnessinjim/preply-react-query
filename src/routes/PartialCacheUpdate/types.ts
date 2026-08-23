export interface OrderPriority {
  id: number;
  customer_name: string;
  item: string;
  priority: boolean;
}

export interface TogglePriorityInput {
  priority: boolean;
}
