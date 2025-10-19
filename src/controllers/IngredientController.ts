import { PrismaClient } from "@prisma/client";
import { IFilling, ISauce } from "../interfaces/i-alimento";
import { Filling, Sauce } from "../models/Alimento";

export class IngredientController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Fillings
  public async getFillings(): Promise<IFilling[]> {
    const fillings = await this.prisma.filling.findMany();
    return fillings.map((filling) => ({
      id: filling.id,
      nombre: filling.nombre,
      precio: filling.precio,
    }));
  }

  public async createFilling(fillingData: Partial<IFilling>): Promise<IFilling> {
    try {
      if (!fillingData.nombre || fillingData.precio === undefined) {
        throw new Error("Nombre y precio son requeridos para crear un relleno");
      }

      const fillingCreado = await this.prisma.filling.create({
        data: {
          nombre: fillingData.nombre,
          precio: fillingData.precio,
        },
      });

      return new Filling(
        fillingCreado.nombre,
        fillingCreado.precio,
        fillingCreado.id
      );
    } catch (error) {
      console.error("Error al crear el relleno:", error);
      throw new Error("Error al crear relleno en la base de datos: " + error);
    }
  }

  public async replaceFilling(id: number, fillingData: IFilling): Promise<IFilling> {
    try {
      if (!fillingData.nombre || fillingData.precio === undefined) {
        throw new Error("Nombre y precio son requeridos para actualizar un relleno");
      }

      const fillingActualizado = await this.prisma.filling.update({
        where: { id },
        data: {
          nombre: fillingData.nombre,
          precio: fillingData.precio,
        },
      });

      return new Filling(
        fillingActualizado.nombre,
        fillingActualizado.precio,
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
  public async getSauces(): Promise<ISauce[]> {
    const sauces = await this.prisma.sauce.findMany();
    return sauces.map((sauce) => ({
      id: sauce.id,
      nombre: sauce.nombre,
      precio: sauce.precio,
    }));
  }

  public async createSauce(sauceData: Partial<ISauce>): Promise<ISauce> {
    try {
      if (!sauceData.nombre || sauceData.precio === undefined) {
        throw new Error("Nombre y precio son requeridos para crear una salsa");
      }

      const sauceCreada = await this.prisma.sauce.create({
        data: {
          nombre: sauceData.nombre,
          precio: sauceData.precio,
        },
      });

      return new Sauce(
        sauceCreada.nombre,
        sauceCreada.precio,
        sauceCreada.id
      );
    } catch (error) {
      console.error("Error al crear la salsa:", error);
      throw new Error("Error al crear salsa en la base de datos: " + error);
    }
  }

  public async replaceSauce(id: number, sauceData: ISauce): Promise<ISauce> {
    try {
      if (!sauceData.nombre || sauceData.precio === undefined) {
        throw new Error("Nombre y precio son requeridos para actualizar una salsa");
      }

      const sauceActualizada = await this.prisma.sauce.update({
        where: { id },
        data: {
          nombre: sauceData.nombre,
          precio: sauceData.precio,
        },
      });

      return new Sauce(
        sauceActualizada.nombre,
        sauceActualizada.precio,
        sauceActualizada.id
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
  public async getCheapestFilling(): Promise<IFilling | null> {
    try {
      const cheapestFilling = await this.prisma.filling.findFirst({
        orderBy: { precio: "asc" },
      });
      return cheapestFilling
        ? new Filling(cheapestFilling.nombre, cheapestFilling.precio, cheapestFilling.id)
        : null;
    } catch (error) {
      console.error("Error al obtener el relleno más barato:", error);
      throw new Error("Error al obtener el relleno más barato: " + error);
    }
  }

  public async getMostExpensiveFilling(): Promise<IFilling | null> {
    try {
      const expensiveFilling = await this.prisma.filling.findFirst({
        orderBy: { precio: "desc" },
      });
      return expensiveFilling
        ? new Filling(expensiveFilling.nombre, expensiveFilling.precio, expensiveFilling.id)
        : null;
    } catch (error) {
      console.error("Error al obtener el relleno más caro:", error);
      throw new Error("Error al obtener el relleno más caro: " + error);
    }
  }

  public async getAverageFillingPrice(): Promise<number> {
    try {
      const fillings = await this.prisma.filling.findMany();
      const total = fillings.reduce((sum, filling) => sum + filling.precio, 0);
      return fillings.length > 0 ? total / fillings.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de los rellenos:", error);
      throw new Error("Error al obtener el precio promedio de los rellenos: " + error);
    }
  }

  // Statistics for Sauces
  public async getCheapestSauce(): Promise<ISauce | null> {
    try {
      const cheapestSauce = await this.prisma.sauce.findFirst({
        orderBy: { precio: "asc" },
      });
      return cheapestSauce
        ? new Sauce(cheapestSauce.nombre, cheapestSauce.precio, cheapestSauce.id)
        : null;
    } catch (error) {
      console.error("Error al obtener la salsa más barata:", error);
      throw new Error("Error al obtener la salsa más barata: " + error);
    }
  }

  public async getMostExpensiveSauce(): Promise<ISauce | null> {
    try {
      const expensiveSauce = await this.prisma.sauce.findFirst({
        orderBy: { precio: "desc" },
      });
      return expensiveSauce
        ? new Sauce(expensiveSauce.nombre, expensiveSauce.precio, expensiveSauce.id)
        : null;
    } catch (error) {
      console.error("Error al obtener la salsa más cara:", error);
      throw new Error("Error al obtener la salsa más cara: " + error);
    }
  }

  public async getAverageSaucePrice(): Promise<number> {
    try {
      const sauces = await this.prisma.sauce.findMany();
      const total = sauces.reduce((sum, sauce) => sum + sauce.precio, 0);
      return sauces.length > 0 ? total / sauces.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de las salsas:", error);
      throw new Error("Error al obtener el precio promedio de las salsas: " + error);
    }
  }
}
