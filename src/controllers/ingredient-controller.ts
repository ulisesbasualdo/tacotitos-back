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
    try {
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
    } catch (error) {
      throw new Error("Error al crear relleno en la base de datos: " + error);
    }
  }

  public async replaceFilling(
    id: number,
    fillingData: TacoContent
  ): Promise<TacoContent> {
    try {
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
    } catch (error) {
      throw new Error(
        "Error al actualizar relleno en la base de datos: " + error
      );
    }
  }

  public async removeFilling(id: number): Promise<void> {
    try {
      await this.prisma.filling.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(
        "Error al eliminar relleno en la base de datos: " + error
      );
    }
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
    try {
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
    } catch (error) {
      throw new Error("Error al crear salsa en la base de datos: " + error);
    }
  }

  public async replaceSauce(
    id: number,
    sauceData: TacoContent
  ): Promise<TacoContent> {
    try {
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
    } catch (error) {
      throw new Error(
        "Error al actualizar salsa en la base de datos: " + error
      );
    }
  }

  public async removeSauce(id: number): Promise<void> {
    try {
      await this.prisma.sauce.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Error al eliminar salsa en la base de datos: " + error);
    }
  }

  // Statistics for Fillings
  public async getCheapestFilling(): Promise<TacoContent | null> {
    try {
      const cheapestFilling = await this.prisma.filling.findFirst({
        orderBy: { price: "asc" },
      });
      return cheapestFilling ?? null;
    } catch (error) {
      throw new Error("Error al obtener el relleno más barato: " + error);
    }
  }

  public async getMostExpensiveFilling(): Promise<TacoContent | null> {
    try {
      const expensiveFilling = await this.prisma.filling.findFirst({
        orderBy: { price: "desc" },
      });
      return expensiveFilling ?? null;
    } catch (error) {
      throw new Error("Error al obtener el relleno más caro: " + error);
    }
  }

  public async getAverageFillingPrice(): Promise<number> {
    try {
      const fillings = await this.prisma.filling.findMany();
      const total = fillings.reduce(
        (sum: number, filling: TacoContent) => sum + filling.price,
        0
      );
      return fillings.length > 0 ? total / fillings.length : 0;
    } catch (error) {
      throw new Error(
        "Error al obtener el precio promedio de los rellenos: " + error
      );
    }
  }

  // Statistics for Sauces
  public async getCheapestSauce(): Promise<TacoContent | null> {
    try {
      const cheapestSauce = await this.prisma.sauce.findFirst({
        orderBy: { price: "asc" },
      });
      return cheapestSauce ?? null;
    } catch (error) {
      throw new Error("Error al obtener la salsa más barata: " + error);
    }
  }

  public async getMostExpensiveSauce(): Promise<TacoContent | null> {
    try {
      const expensiveSauce = await this.prisma.sauce.findFirst({
        orderBy: { price: "desc" },
      });
      return expensiveSauce ?? null;
    } catch (error) {
      throw new Error("Error al obtener la salsa más cara: " + error);
    }
  }

  public async getAverageSaucePrice(): Promise<number> {
    try {
      const sauces = await this.prisma.sauce.findMany();
      const total = sauces.reduce(
        (sum: number, sauce: TacoContent) => sum + sauce.price,
        0
      );
      return sauces.length > 0 ? total / sauces.length : 0;
    } catch (error) {
      throw new Error(
        "Error al obtener el precio promedio de las salsas: " + error
      );
    }
  }
}
