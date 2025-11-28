import { PrismaClient } from "@prisma/client";
import { Delivery } from "../interfaces/delivery";
import { BaseController } from "./base-controller";
type CreateDelivery = Pick<Delivery, "name" | "patent" | "state" | "cellphone">;
export class DeliveryController extends BaseController<
  Delivery,
  CreateDelivery
> {
  constructor() {
    super(new PrismaClient().delivery);
  }
}
