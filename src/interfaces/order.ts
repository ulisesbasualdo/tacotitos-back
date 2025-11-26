import { Customer } from "./customer";
import { Delivery } from "./delivery";

export interface Order {
  id: number;
  datetime: Date;
  price: number;
  isDelivered: boolean;
  customerId: number;
  deliveryId: number;
}

export interface OrderWithCustomer extends Order {
  customer: Customer;
}

export interface OrderWithDelivery extends Order {
  delivery: Delivery;
}

export interface OrderWithCustomerAndDelivery extends Order {
  customer: Customer;
  delivery: Delivery;
}
