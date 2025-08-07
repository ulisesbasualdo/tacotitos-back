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

  public async crearAlimento(alimentoData: IAlimento): Promise<IAlimento> {
    const controller = new AlimentoController();

    try {
      if (
        !alimentoData.nombre ||
        !alimentoData.precio ||
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
}
