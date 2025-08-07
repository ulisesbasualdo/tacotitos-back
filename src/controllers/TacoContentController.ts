import { PrismaClient } from "@prisma/client";
import { Utils } from "../utils/utils";
import { ITacoContent } from "../interfaces/i-taco-content";
// #region tortilla
export class TacoContentController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getTortillas(): Promise<ITacoContent[]> {
    return this.prisma.tortilla.findMany();
  }

  public static async crearTortilla(tortillaData: ITacoContent): Promise<ITacoContent> {
    const controller = new TacoContentController();

    try {
      // Validar que los datos necesarios estén presentes
      if (!tortillaData.nombre || tortillaData.precio === undefined) {
        throw new Error(
          "Nombre y precio son requeridos para crear una tortilla"
        );
      }

      // Generar ID único usando la utilidad existente
      const tortillaId = Utils.generarUUID();

      // Crear la tortilla en la base de datos
      const tortillaCreada = await controller.prisma.tortilla.create({
        data: {
          id: tortillaId,
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
}
