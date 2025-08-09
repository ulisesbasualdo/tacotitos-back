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

  public static async crearAlimento(alimentoData: Partial<IAlimento>): Promise<IAlimento> {
    const controller = new AlimentoController();

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

      const alimentoCreado = await controller.prisma.alimento.create({
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

  public static async actualizarAlimento(id: string, alimentoData: IAlimento): Promise<IAlimento> {
    const controller = new AlimentoController();

    try {
      if (!alimentoData.nombre || alimentoData.precio === undefined) {
        throw new Error(
          "Nombre y precio son requeridos para actualizar un alimento"
        );
      }

      const alimentoActualizado = await controller.prisma.alimento.update({
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

  public static async eliminarAlimento(id: string): Promise<void> {
    const controller = new AlimentoController();

    try {
      await controller.prisma.alimento.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar alimento:", error);
      throw new Error("Error al eliminar alimento en la base de datos: " + error);
    }
  }
}
