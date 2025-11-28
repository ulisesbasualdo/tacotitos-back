import { PrismaClient } from "@prisma/client";
import { Order } from "../interfaces/order";
import { BaseController } from "./base-controller";

type CreateOrder = Pick<
  Order,
  "datetime" | "customerId" | "deliveryId" | "isDelivered" | "price"
>;

export class OrderController extends BaseController<Order, CreateOrder> {
  constructor() {
    super(new PrismaClient().order);
  }

  public async updateDeliveredStatus(
    id: number,
    isDelivered: boolean
  ): Promise<void> {
    this.dbDelegate.update({
      where: { id },
      data: {
        isDelivered,
      },
    });
  }
}
