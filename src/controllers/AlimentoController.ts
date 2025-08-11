import { PrismaClient } from "@prisma/client";
import { IAlimento, TTipoAlimento } from "../interfaces/i-alimento";
import { Utils } from "../utils/utils";

export class AlimentoController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAlimentosTortilla(): Promise<IAlimento[]> {
    const alimentos = await this.prisma.alimento.findMany({
      where: {
        tipoAlimento: "alimentoTortilla",
      },
    });

    return alimentos.map((alimento) => ({
      ...alimento,
      tipoAlimento: alimento.tipoAlimento as TTipoAlimento,
    }));
  }

  public async getSalsas(): Promise<IAlimento[]> {
    const salsas = await this.prisma.alimento.findMany({
      where: {
        tipoAlimento: "salsa",
      },
    });

    return salsas.map((salsa) => ({
      ...salsa,
      tipoAlimento: salsa.tipoAlimento as TTipoAlimento,
    }));
  }

  public async addAlimento(alimentoData: Partial<IAlimento>): Promise<IAlimento> {
    try {
      if (
        !alimentoData.nombre ||
        alimentoData.precio === undefined ||
        !alimentoData.tipoAlimento
      ) {
        throw new Error(
          "Nombre, precio y tipo de alimento son requeridos para crear un alimento"
        );
      }

      const alimentoId = Utils.generarUUID();

      const alimentoCreado = await this.prisma.alimento.create({
        data: {
          id: alimentoId,
          nombre: alimentoData.nombre,
          precio: alimentoData.precio,
          tipoAlimento: alimentoData.tipoAlimento,
        },
      });

      return {
        id: alimentoCreado.id,
        nombre: alimentoCreado.nombre,
        precio: alimentoCreado.precio,
        tipoAlimento: alimentoCreado.tipoAlimento as TTipoAlimento,
      };
    } catch (error) {
      console.error("error al crear el alimento", error);
      throw new Error("Error al crear alimento en la base de datos: " + error);
    }
  }

  public async updateAlimento(id: string, alimentoData: IAlimento): Promise<IAlimento> {
    try {
      if (!alimentoData.nombre || alimentoData.precio === undefined) {
        throw new Error(
          "Nombre y precio son requeridos para actualizar un alimento"
        );
      }

      const alimentoActualizado = await this.prisma.alimento.update({
        where: { id },
        data: {
          nombre: alimentoData.nombre,
          precio: alimentoData.precio,
          tipoAlimento: alimentoData.tipoAlimento,
        },
      });

      return {
        id: alimentoActualizado.id,
        nombre: alimentoActualizado.nombre,
        precio: alimentoActualizado.precio,
        tipoAlimento: alimentoActualizado.tipoAlimento as TTipoAlimento,
      };
    } catch (error) {
      console.error("Error al actualizar alimento:", error);
      throw new Error("Error al actualizar alimento en la base de datos: " + error);
    }
  }

  public async deleteAlimento(id: string): Promise<void> {
    try {
      await this.prisma.alimento.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar alimento:", error);
      throw new Error("Error al eliminar alimento en la base de datos: " + error);
    }
  }

  //#region utils

  public static async getCheapestAlimentosDeTortilla(): Promise<IAlimento[] | null> {
    const controller = new AlimentoController();

    try {
      // encontrar primeros 5 mas caros
      const cheapestAlimentos = await controller.prisma.alimento.findMany({
        where: { tipoAlimento: "alimentoTortilla" },
        orderBy: { precio: "asc" },
        take: 5,
      });
      return cheapestAlimentos as IAlimento[];
    } catch (error) {
      console.error("Error al obtener el alimento de tortilla más barato:", error);
      throw new Error("Error al obtener el alimento de tortilla más barato en la base de datos: " + error);
    }
  }

  public static async getCheapestSalsa(): Promise<IAlimento | null> {
    const controller = new AlimentoController();

    try {
      const cheapestSalsa = await controller.prisma.alimento.findFirst({
        where: { tipoAlimento: "salsa" },
        orderBy: { precio: "asc" },
      });
      return cheapestSalsa as IAlimento;
    } catch (error) {
      console.error("Error al obtener la salsa más barata:", error);
      throw new Error("Error al obtener la salsa más barata en la base de datos: " + error);
    }
  }

  public static async getExpensiveSalsa(): Promise<IAlimento | null> {
    const controller = new AlimentoController();

    try {
      const expensiveSalsa = await controller.prisma.alimento.findFirst({
        where: { tipoAlimento: "salsa" },
        orderBy: { precio: "desc" },
      });
      return expensiveSalsa as IAlimento;
    } catch (error) {
      console.error("Error al obtener la salsa más cara:", error);
      throw new Error("Error al obtener la salsa más cara en la base de datos: " + error);
    }
  }

  public static async getExpensiveAlimentosDeTortilla(): Promise<IAlimento[] | null> {
    const controller = new AlimentoController();

    try {
      const expensiveAlimentos = await controller.prisma.alimento.findMany({
        where: { tipoAlimento: "alimentoTortilla" },
        orderBy: { precio: "desc" },
      });
      return expensiveAlimentos as IAlimento[];
    } catch (error) {
      console.error("Error al obtener los alimentos de tortilla más caros:", error);
      throw new Error("Error al obtener los alimentos de tortilla más caros en la base de datos: " + error);
    }
  }

  public static async getAverageAlimentosDeTortilla(): Promise<number> {
    const controller = new AlimentoController();

    try {
      const alimentos = await controller.prisma.alimento.findMany({
        where: { tipoAlimento: "alimentoTortilla" },
      });
      const total = alimentos.reduce((sum, alimento) => sum + (alimento.precio || 0), 0);
      return alimentos.length > 0 ? total / alimentos.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de los alimentos de tortilla:", error);
      throw new Error("Error al obtener el precio promedio de los alimentos de tortilla en la base de datos: " + error);
    }
  }

  public static async getAverageSalsaPrice(): Promise<number> {
    const controller = new AlimentoController();

    try {
      const salsas = await controller.prisma.alimento.findMany({
        where: { tipoAlimento: "salsa" },
      });
      const total = salsas.reduce((sum, salsa) => sum + (salsa.precio || 0), 0);
      return salsas.length > 0 ? total / salsas.length : 0;
    } catch (error) {
      console.error("Error al obtener el precio promedio de las salsas:", error);
      throw new Error("Error al obtener el precio promedio de las salsas en la base de datos: " + error);
    }
  }
}
