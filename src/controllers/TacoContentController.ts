import { PrismaClient } from "@prisma/client";
import { ITacoContent } from "../interfaces/i-taco-content";

export class TacoContentController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async listTortillas(): Promise<ITacoContent[]> {
    const tortillas = await this.prisma.tortilla.findMany();
    return tortillas.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      precio: t.precio,
    }));
  }

  public async createTortilla(tortillaData: Partial<ITacoContent>): Promise<ITacoContent> {
    try {
      if (!tortillaData.nombre || tortillaData.precio === undefined) {
        throw new Error("Nombre y precio son requeridos para crear una tortilla");
      }

      const tortillaCreada = await this.prisma.tortilla.create({
        data: {
          nombre: tortillaData.nombre,
          precio: tortillaData.precio,
        },
      });

      return {
        id: tortillaCreada.id,
        nombre: tortillaCreada.nombre,
        precio: tortillaCreada.precio,
      };
    } catch (error) {
      console.error("Error al crear tortilla:", error);
      throw new Error("Error al crear tortilla en la base de datos: " + error);
    }
  }

  public async replaceTortilla(id: number, tortillaData: ITacoContent): Promise<ITacoContent> {
    try {
      if (!tortillaData.nombre || tortillaData.precio === undefined) {
        throw new Error(
          "Nombre y precio son requeridos para actualizar una tortilla"
        );
      }

      const tortillaActualizada = await this.prisma.tortilla.update({
        where: { id },
        data: {
          nombre: tortillaData.nombre,
          precio: tortillaData.precio,
        },
      });

      return {
        id: tortillaActualizada.id,
        nombre: tortillaActualizada.nombre,
        precio: tortillaActualizada.precio,
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

  public async getCheapestTortilla(): Promise<ITacoContent | null> {
    try {
      const cheapestTortilla = await this.prisma.tortilla.findFirst({
        orderBy: { precio: "asc" },
      });
      return cheapestTortilla
        ? {
            id: cheapestTortilla.id,
            nombre: cheapestTortilla.nombre,
            precio: cheapestTortilla.precio,
          }
        : null;
    } catch (error) {
      console.error("Error al obtener la tortilla más barata:", error);
      throw new Error("Error al obtener la tortilla más barata: " + error);
    }
  }

  public async getMostExpensiveTortilla(): Promise<ITacoContent | null> {
    try {
      const expensiveTortilla = await this.prisma.tortilla.findFirst({
        orderBy: { precio: "desc" },
      });
      return expensiveTortilla
        ? {
            id: expensiveTortilla.id,
            nombre: expensiveTortilla.nombre,
            precio: expensiveTortilla.precio,
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
      const total = tortillas.reduce((sum, tortilla) => sum + tortilla.precio, 0);
      return tortillas.length > 0 ? total / tortillas.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de las tortillas:", error);
      throw new Error("Error al obtener el precio promedio de las tortillas: " + error);
    }
  }
}
