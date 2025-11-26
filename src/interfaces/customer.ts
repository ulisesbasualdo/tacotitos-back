import { Order } from "./order";

export interface Customer {
  id: number;
  name: string;
  cellphone: string;
}

export interface CustomerWithOrder extends Customer {
  orders: Order[];
}
