export interface Order {
  id: string;
  itemName: string;
  itemImage?: string;
  quantity: number;
  orderDate: Date | string;
  amount: number;
  status: OrderStatus;
}

export enum OrderStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}