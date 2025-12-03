import { prisma } from "../../prisma/prisma";
import { BaseController } from "./base-controller";
import { TacoContent } from "../interfaces/taco-content";

type CreateFilling = Pick<TacoContent, "name" | "price">;

export class FillingController extends BaseController<
  TacoContent,
  CreateFilling
> {
  constructor() {
    super(prisma.filling);
  }

  // Statistics for Fillings
  public async getCheapestFilling(): Promise<TacoContent | null> {
    const cheapestFilling = await this.dbDelegate.findFirst({
      orderBy: { price: "asc" },
    });
    return cheapestFilling ?? null;
  }

  public async getMostExpensiveFilling(): Promise<TacoContent | null> {
    const expensiveFilling = await this.dbDelegate.findFirst({
      orderBy: { price: "desc" },
    });
    return expensiveFilling ?? null;
  }

  public async getAverageFillingPrice(): Promise<number> {
    const fillings = await this.dbDelegate.findMany();
    const total = fillings.reduce(
      (sum: number, filling: TacoContent) => sum + filling.price,
      0
    );
    return fillings.length > 0 ? total / fillings.length : 0;
  }
}
