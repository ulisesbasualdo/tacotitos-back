import { PrismaClient } from "@prisma/client";
import { Customer } from "../interfaces/customer";

type CreateCustomer = Pick<Customer, "name" | "cellphone">;

export class CustomerController {
  private readonly customerDB = new PrismaClient().customer;

  public async getCustomer(id: number): Promise<Customer | null> {
    const customer = await this.customerDB.findUnique({
      where: { id },
    });
    return customer;
  }

  public async createCustomer(customer: CreateCustomer): Promise<Customer> {
    return this.customerDB.create({
      data: customer,
    });
  }

  public async updateCustomer(
    id: number,
    customerData: Customer
  ): Promise<Customer> {
    if (!customerData.name || !customerData.cellphone) {
      throw new Error(
        "Nombre y celular son requeridos para actualizar un cliente"
      );
    }

    const updatedCustomer = await this.customerDB.update({
      where: { id },
      data: {
        name: customerData.name,
        cellphone: customerData.cellphone,
      },
    });

    return updatedCustomer;
  }

  public async deleteCustomer(id: number): Promise<void> {
    await this.customerDB.delete({
      where: { id },
    });
  }
}
