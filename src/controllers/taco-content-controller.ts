import { PrismaClient } from "@prisma/client";
import { TacoContent } from "../interfaces/taco-content";

export class TacoContentController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async listTortillas(): Promise<TacoContent[]> {
    const tortillas = await this.prisma.tortilla.findMany();
    return tortillas.map((tortilla: TacoContent) => ({
      id: tortilla.id,
      name: tortilla.name,
      price: tortilla.price,
    }));
  }

  public async createTortilla(
    tortillaData: Partial<TacoContent>
  ): Promise<TacoContent> {
    if (!tortillaData.name || tortillaData.price === undefined) {
      throw new Error("name y price son requeridos para crear una tortilla");
    }

    const tortillaCreada = await this.prisma.tortilla.create({
      data: {
        name: tortillaData.name,
        price: tortillaData.price,
      },
    });

    return tortillaCreada;
  }

  public async replaceTortilla(
    id: number,
    tortillaData: TacoContent
  ): Promise<TacoContent> {
    if (!tortillaData.name || tortillaData.price === undefined) {
      throw new Error(
        "name y price son requeridos para actualizar una tortilla"
      );
    }

    const tortillaActualizada = await this.prisma.tortilla.update({
      where: { id },
      data: {
        name: tortillaData.name,
        price: tortillaData.price,
      },
    });

    return tortillaActualizada;
  }

  public async removeTortilla(id: number): Promise<void> {
    await this.prisma.tortilla.delete({
      where: { id },
    });
  }

  public async getCheapestTortilla(): Promise<TacoContent | null> {
    const cheapestTortilla = await this.prisma.tortilla.findFirst({
      orderBy: { price: "asc" },
    });
    return cheapestTortilla ?? null;
  }

  public async getMostExpensiveTortilla(): Promise<TacoContent | null> {
    const expensiveTortilla = await this.prisma.tortilla.findFirst({
      orderBy: { price: "desc" },
    });
    return expensiveTortilla ?? null;
  }

  public async getAverageTortillaPrice(): Promise<number> {
    const tortillas = await this.prisma.tortilla.findMany();
    const total = tortillas.reduce(
      (sum: number, tortilla: TacoContent) => sum + tortilla.price,
      0
    );
    return tortillas.length > 0 ? total / tortillas.length : 0;
  }
}
