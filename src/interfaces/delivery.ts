import { Order } from "./order";

export interface Delivery {
  id: number;
  patent: string;
  name: string;
  cellphone: string;
  state: string;
}

export interface DeliveryWithOrders extends Delivery {
  orders: Order[];
}
