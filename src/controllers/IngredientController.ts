import { PrismaClient } from "@prisma/client";
import { Filling } from "../models/Filling";
import { TacoContent } from "../interfaces/taco-content";
import { Sauce } from "../models/Sauce";

export class IngredientController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Fillings
  public async getFillings(): Promise<TacoContent[]> {
    const fillings = await this.prisma.filling.findMany();
    return fillings.map((filling) => ({
      id: filling.id,
      name: filling.name,
      price: filling.price,
    }));
  }

  public async createFilling(fillingData: Partial<TacoContent>): Promise<TacoContent> {
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

      return new Filling(
        fillingCreado.name,
        fillingCreado.price,
        fillingCreado.id
      );
    } catch (error) {
      console.error("Error al crear el relleno:", error);
      throw new Error("Error al crear relleno en la base de datos: " + error);
    }
  }

  public async replaceFilling(id: number, fillingData: TacoContent): Promise<TacoContent> {
    try {
      if (!fillingData.name || fillingData.price === undefined) {
        throw new Error("Nombre y precio son requeridos para actualizar un relleno");
      }

      const fillingActualizado = await this.prisma.filling.update({
        where: { id },
        data: {
          name: fillingData.name,
          price: fillingData.price,
        },
      });

      return new Filling(
        fillingActualizado.name,
        fillingActualizado.price,
        fillingActualizado.id
      );
    } catch (error) {
      console.error("Error al actualizar relleno:", error);
      throw new Error("Error al actualizar relleno en la base de datos: " + error);
    }
  }

  public async removeFilling(id: number): Promise<void> {
    try {
      await this.prisma.filling.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar relleno:", error);
      throw new Error("Error al eliminar relleno en la base de datos: " + error);
    }
  }

  // Sauces
  public async getSauces(): Promise<TacoContent[]> {
    const sauces = await this.prisma.sauce.findMany();
    return sauces.map((sauce) => ({
      id: sauce.id,
      name: sauce.name,
      price: sauce.price,
    }));
  }

  public async createSauce(sauceData: Partial<TacoContent>): Promise<TacoContent> {

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

      return new Sauce(
        sauceCreada.name,
        sauceCreada.price,
      );
    } catch (error) {
      console.error("Error al crear la salsa:", error);
      throw new Error("Error al crear salsa en la base de datos: " + error);
    }
  }

  public async replaceSauce(id: number, sauceData: TacoContent): Promise<TacoContent> {
    try {
      if (!sauceData.name || sauceData.price === undefined) {
        throw new Error("Nombre y precio son requeridos para actualizar una salsa");
      }

      const sauceActualizada = await this.prisma.sauce.update({
        where: { id },
        data: {
          name: sauceData.name,
          price: sauceData.price,
        },
      });

      return new Sauce(
        sauceActualizada.name,
        sauceActualizada.price,
      );
    } catch (error) {
      console.error("Error al actualizar salsa:", error);
      throw new Error("Error al actualizar salsa en la base de datos: " + error);
    }
  }

  public async removeSauce(id: number): Promise<void> {
    try {
      await this.prisma.sauce.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar salsa:", error);
      throw new Error("Error al eliminar salsa en la base de datos: " + error);
    }
  }

  // Statistics for Fillings
  public async getCheapestFilling(): Promise<TacoContent | null> {
    try {
      const cheapestFilling = await this.prisma.filling.findFirst({
        orderBy: { price: "asc" },
      });
      return cheapestFilling
        ? new Filling(cheapestFilling.name, cheapestFilling.price, cheapestFilling.id)
        : null;
    } catch (error) {
      console.error("Error al obtener el relleno más barato:", error);
      throw new Error("Error al obtener el relleno más barato: " + error);
    }
  }

  public async getMostExpensiveFilling(): Promise<TacoContent | null> {
    try {
      const expensiveFilling = await this.prisma.filling.findFirst({
        orderBy: { price: "desc" },
      });
      return expensiveFilling
        ? new Filling(expensiveFilling.name, expensiveFilling.price, expensiveFilling.id)
        : null;
    } catch (error) {
      console.error("Error al obtener el relleno más caro:", error);
      throw new Error("Error al obtener el relleno más caro: " + error);
    }
  }

  public async getAverageFillingPrice(): Promise<number> {
    try {
      const fillings = await this.prisma.filling.findMany();
      const total = fillings.reduce((sum, filling) => sum + filling.price, 0);
      return fillings.length > 0 ? total / fillings.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de los rellenos:", error);
      throw new Error("Error al obtener el precio promedio de los rellenos: " + error);
    }
  }

  // Statistics for Sauces
  public async getCheapestSauce(): Promise<TacoContent | null> {
    try {
      const cheapestSauce = await this.prisma.sauce.findFirst({
        orderBy: { price: "asc" },
      });
      return cheapestSauce
        ? new Sauce(cheapestSauce.name, cheapestSauce.price)
        : null;
    } catch (error) {
      console.error("Error al obtener la salsa más barata:", error);
      throw new Error("Error al obtener la salsa más barata: " + error);
    }
  }

  public async getMostExpensiveSauce(): Promise<TacoContent | null> {
    try {
      const expensiveSauce = await this.prisma.sauce.findFirst({
        orderBy: { price: "desc" },
      });
      return expensiveSauce
        ? new Sauce(expensiveSauce.name, expensiveSauce.price)
        : null;
    } catch (error) {
      console.error("Error al obtener la salsa más cara:", error);
      throw new Error("Error al obtener la salsa más cara: " + error);
    }
  }

  public async getAverageSaucePrice(): Promise<number> {
    try {
      const sauces = await this.prisma.sauce.findMany();
      const total = sauces.reduce((sum, sauce) => sum + sauce.price, 0);
      return sauces.length > 0 ? total / sauces.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de las salsas:", error);
      throw new Error("Error al obtener el precio promedio de las salsas: " + error);
    }
  }
}
