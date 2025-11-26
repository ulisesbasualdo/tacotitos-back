import { PrismaClient } from "@prisma/client";
import { TacoContent } from "../interfaces/taco-content";

export class TacoContentController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async listTortillas(): Promise<TacoContent[]> {
    const tortillas = await this.prisma.tortilla.findMany();
    return tortillas.map((tortilla) => ({
      id: tortilla.id,
      name: tortilla.name,
      price: tortilla.price,
    }));
  }

  public async createTortilla(tortillaData: Partial<TacoContent>): Promise<TacoContent> {
    try {
      if (!tortillaData.name || tortillaData.price === undefined) {
        throw new Error("name y price son requeridos para crear una tortilla");
      }

      const tortillaCreada = await this.prisma.tortilla.create({
        data: {
          name: tortillaData.name,
          price: tortillaData.price,
        },
      });

      return {
        id: tortillaCreada.id,
        name: tortillaCreada.name,
        price: tortillaCreada.price,
      };
    } catch (error) {
      console.error("Error al crear tortilla:", error);
      throw new Error("Error al crear tortilla en la base de datos: " + error);
    }
  }

  public async replaceTortilla(id: number, tortillaData: TacoContent): Promise<TacoContent> {
    try {
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

      return {
        id: tortillaActualizada.id,
        name: tortillaActualizada.name,
        price: tortillaActualizada.price,
      };
    } catch (error) {
      console.error("Error al actualizar tortilla:", error);
      throw new Error("Error al actualizar tortilla en la base de datos: " + error);
    }
  }

  public async removeTortilla(id: number): Promise<void> {
    try {
      await this.prisma.tortilla.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar tortilla:", error);
      throw new Error("Error al eliminar tortilla en la base de datos: " + error);
    }
  }

  public async getCheapestTortilla(): Promise<TacoContent | null> {
    try {
      const cheapestTortilla = await this.prisma.tortilla.findFirst({
        orderBy: { price: "asc" },
      });
      return cheapestTortilla
        ? {
            id: cheapestTortilla.id,
            name: cheapestTortilla.name,
            price: cheapestTortilla.price,
          }
        : null;
    } catch (error) {
      console.error("Error al obtener la tortilla más barata:", error);
      throw new Error("Error al obtener la tortilla más barata: " + error);
    }
  }

  public async getMostExpensiveTortilla(): Promise<TacoContent | null> {
    try {
      const expensiveTortilla = await this.prisma.tortilla.findFirst({
        orderBy: { price: "desc" },
      });
      return expensiveTortilla
        ? {
            id: expensiveTortilla.id,
            name: expensiveTortilla.name,
            price: expensiveTortilla.price,
          }
        : null;
    } catch (error) {
      console.error("Error al obtener la tortilla más cara:", error);
      throw new Error("Error al obtener la tortilla más cara: " + error);
    }
  }

  public async getAverageTortillaPrice(): Promise<number> {
    try {
      const tortillas = await this.prisma.tortilla.findMany();
      const total = tortillas.reduce((sum, tortilla) => sum + tortilla.price, 0);
      return tortillas.length > 0 ? total / tortillas.length : 0;
    } catch (error) {
      console.error("Error al obtener el price promedio de las tortillas:", error);
      throw new Error("Error al obtener el price promedio de las tortillas: " + error);
    }
  }
}
