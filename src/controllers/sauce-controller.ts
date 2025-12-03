import { prisma } from "../../prisma/prisma";
import { BaseController } from "./base-controller";
import { TacoContent } from "../interfaces/taco-content";

type CreateSauce = Pick<TacoContent, "name" | "price">;

export class SauceController extends BaseController<
  TacoContent,
  CreateSauce
> {
  constructor() {
    super(prisma.sauce);
  }

  public async getCheapestSauce(): Promise<TacoContent | null> {
    const cheapestSauce = await this.dbDelegate.findFirst({
      orderBy: { price: "asc" },
    });
    return cheapestSauce ?? null;
  }

  public async getMostExpensiveSauce(): Promise<TacoContent | null> {
    const expensiveSauce = await this.dbDelegate.findFirst({
      orderBy: { price: "desc" },
    });
    return expensiveSauce ?? null;
  }

  public async getAverageSaucePrice(): Promise<number> {
    const sauces = await this.dbDelegate.findMany();
    const total = sauces.reduce(
      (sum: number, sauce: TacoContent) => sum + sauce.price,
      0
    );
    return sauces.length > 0 ? total / sauces.length : 0;
  }
}
