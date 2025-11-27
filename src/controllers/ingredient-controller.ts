import { PrismaClient } from "@prisma/client";
import { TacoContent } from "../interfaces/taco-content";

export class IngredientController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Fillings
  public async getFillings(): Promise<TacoContent[]> {
    const fillings = await this.prisma.filling.findMany();
    return fillings.map((filling: TacoContent) => ({
      filling: filling,
    }));
  }

  public async createFilling(
    fillingData: Partial<TacoContent>
  ): Promise<TacoContent> {
    if (!fillingData.name || fillingData.price === undefined) {
      throw new Error("Nombre y precio son requeridos para crear un relleno");
    }
    const fillingCreado = await this.prisma.filling.create({
      data: {
        name: fillingData.name,
        price: fillingData.price,
      },
    });
    return fillingCreado;
  }

  public async updateFilling(
    id: number,
    fillingData: TacoContent
  ): Promise<TacoContent> {
    if (!fillingData.name || fillingData.price === undefined) {
      throw new Error(
        "Nombre y precio son requeridos para actualizar un relleno"
      );
    }

    const fillingActualizado = await this.prisma.filling.update({
      where: { id },
      data: {
        name: fillingData.name,
        price: fillingData.price,
      },
    });

    return fillingActualizado;
  }

  public async deleteFilling(id: number): Promise<void> {
    await this.prisma.filling.delete({
      where: { id },
    });
  }

  // Sauces
  public async getSauces(): Promise<TacoContent[]> {
    const sauces = await this.prisma.sauce.findMany();
    return sauces.map((sauce: TacoContent) => ({
      sauce: sauce,
    }));
  }

  public async createSauce(
    sauceData: Partial<TacoContent>
  ): Promise<TacoContent> {
    if (!sauceData.name || sauceData.price === undefined) {
      throw new Error("Nombre y precio son requeridos para crear una salsa");
    }
    const sauceCreada = await this.prisma.sauce.create({
      data: {
        name: sauceData.name,
        price: sauceData.price,
      },
    });

    return sauceCreada;
  }

  public async updateSauce(
    id: number,
    sauceData: TacoContent
  ): Promise<TacoContent> {
    if (!sauceData.name || sauceData.price === undefined) {
      throw new Error(
        "Nombre y precio son requeridos para actualizar una salsa"
      );
    }

    const sauceActualizada = await this.prisma.sauce.update({
      where: { id },
      data: {
        name: sauceData.name,
        price: sauceData.price,
      },
    });

    return sauceActualizada;
  }

  public async deleteSauce(id: number): Promise<void> {
    await this.prisma.sauce.delete({
      where: { id },
    });
  }

  // Statistics for Fillings
  public async getCheapestFilling(): Promise<TacoContent | null> {
    const cheapestFilling = await this.prisma.filling.findFirst({
      orderBy: { price: "asc" },
    });
    return cheapestFilling ?? null;
  }

  public async getMostExpensiveFilling(): Promise<TacoContent | null> {
    const expensiveFilling = await this.prisma.filling.findFirst({
      orderBy: { price: "desc" },
    });
    return expensiveFilling ?? null;
  }

  public async getAverageFillingPrice(): Promise<number> {
    const fillings = await this.prisma.filling.findMany();
    const total = fillings.reduce(
      (sum: number, filling: TacoContent) => sum + filling.price,
      0
    );
    return fillings.length > 0 ? total / fillings.length : 0;
  }

  // Statistics for Sauces
  public async getCheapestSauce(): Promise<TacoContent | null> {
    const cheapestSauce = await this.prisma.sauce.findFirst({
      orderBy: { price: "asc" },
    });
    return cheapestSauce ?? null;
  }

  public async getMostExpensiveSauce(): Promise<TacoContent | null> {
    const expensiveSauce = await this.prisma.sauce.findFirst({
      orderBy: { price: "desc" },
    });
    return expensiveSauce ?? null;
  }

  public async getAverageSaucePrice(): Promise<number> {
    const sauces = await this.prisma.sauce.findMany();
    const total = sauces.reduce(
      (sum: number, sauce: TacoContent) => sum + sauce.price,
      0
    );
    return sauces.length > 0 ? total / sauces.length : 0;
  }
}
