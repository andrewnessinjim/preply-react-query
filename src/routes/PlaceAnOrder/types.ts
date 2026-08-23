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

export interface UsePlaceOrderCallbacks {
  onSuccess?: (order: PlacedOrder) => void;
  onError?: (error: Error) => void;
}

export interface LogEntry {
  id: number;
  time: string;
  message: string;
}

export interface SuccessPanelProps {
  order: PlacedOrder;
  onPlaceAnother: () => void;
}
