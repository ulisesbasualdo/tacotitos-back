import { PrismaClient } from "@prisma/client";
import { Customer } from "../interfaces/customer";
import { BaseController } from "./base-controller";

type CreateCustomer = Pick<Customer, "name" | "cellphone">;

export class CustomerController extends BaseController<
  Customer,
  CreateCustomer
> {
  constructor() {
    super(new PrismaClient().customer);
  }
}
