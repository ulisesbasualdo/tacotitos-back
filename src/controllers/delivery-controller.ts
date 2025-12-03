import { prisma } from "../../prisma/prisma";
import { Delivery } from "../interfaces/delivery";
import { BaseController } from "./base-controller";
type CreateDelivery = Pick<Delivery, "name" | "patent" | "state" | "cellphone">;
export class DeliveryController extends BaseController<
  Delivery,
  CreateDelivery
> {
  constructor() {
    super(prisma.delivery);
  }
}
