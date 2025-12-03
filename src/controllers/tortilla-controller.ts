import { prisma } from "../../prisma/prisma";
import { TacoContent } from "../interfaces/taco-content";
import { BaseController } from "./base-controller";

type CreateTacoContent = Pick<TacoContent, "name" | "price">

export class TacoContentController extends BaseController<TacoContent, CreateTacoContent> {

  constructor() {
    super(prisma.tortilla)
  }

  public async getCheapestTortilla(): Promise<TacoContent | null> {
    const cheapestTortilla = await this.dbDelegate.findFirst({
      orderBy: { price: "asc" },
    });
    return cheapestTortilla ?? null;
  }

  public async getMostExpensiveTortilla(): Promise<TacoContent | null> {
    const expensiveTortilla = await this.dbDelegate.findFirst({
      orderBy: { price: "desc" },
    });
    return expensiveTortilla ?? null;
  }

  public async getAverageTortillaPrice(): Promise<number> {
    const tortillas = await this.dbDelegate.findMany();
    const total = tortillas.reduce(
      (sum: number, tortilla: TacoContent) => sum + tortilla.price,
      0
    );
    return tortillas.length > 0 ? total / tortillas.length : 0;
  }
}
