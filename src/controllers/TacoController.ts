import { PrismaClient } from "@prisma/client";
import { ITaco } from "../interfaces/i-taco";
import { Alimento } from "../models/Alimento";
import { Taco } from "../models/Taco";
import { Tortilla } from "../models/Tortilla";
import { IAlimento } from "../interfaces/i-alimento";
import { Utils } from "../utils/utils";

export class TacoController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getTacos(): Promise<ITaco[]> {
    const tacosDb = await this.prisma.taco.findMany({
      include: {
        tortilla: true,
        salsa: true,
        alimentos: {
          include: {
            alimento: true,
          },
        },
      },
    });
    return tacosDb.map(this.mapToTacoModel);
  }

  public async getTacoById(id: string): Promise<ITaco | null> {
    const tacoDb = await this.prisma.taco.findUnique({
      where: { id },
      include: {
        tortilla: true,
        salsa: true,
      },
    });
    return tacoDb ? this.mapToTacoModel(tacoDb) : null;
  }

  public async createTaco(taco: ITaco): Promise<ITaco | null> {
    try {
      // Usar Utils.generarUUID() para crear IDs personalizados
      const tortillaId = Utils.generarUUID();

      // Primero crear la tortilla con ID personalizado
      const tortillaCreada = await this.prisma.tortilla.create({
        data: {
          id: tortillaId, // Asignar ID generado por utils
          nombre: taco.tortilla.nombre,
          precio: taco.tortilla.precio,
          tipoTortilla: "simple", // Valor por defecto si no se proporciona
        },
      });

      // Crear salsa si existe
      let salsaCreada = undefined;
      if (taco.salsa) {
        const salsaId = Utils.generarUUID();
        salsaCreada = await this.prisma.alimento.create({
          data: {
            id: salsaId, // Asignar ID generado por utils
            nombre: taco.salsa.nombre,
            tipoAlimento: taco.salsa.tipoAlimento,
            precio: taco.salsa.precio,
          },
        });
      }

      // Crear los alimentos
      const alimentosIds: { alimentoId: string }[] = [];
      if (taco.alimentos && taco.alimentos.length > 0) {
        for (const alimento of taco.alimentos) {
          const alimentoId = Utils.generarUUID();
          const alimentoCreado = await this.prisma.alimento.create({
            data: {
              id: alimentoId, // Asignar ID generado por utils
              nombre: alimento.nombre,
              tipoAlimento: alimento.tipoAlimento,
              precio: alimento.precio,
            },
          });
          alimentosIds.push({ alimentoId: alimentoCreado.id });
        }
      }

      // Crear el taco con ID personalizado
      const tacoId = Utils.generarUUID();
      const tacoCreado = await this.prisma.taco.create({
        data: {
          id: tacoId, // Asignar ID generado por utils
          tortilla: {
            connect: { id: tortillaCreada.id },
          },
          salsa: salsaCreada
            ? {
                connect: { id: salsaCreada.id },
              }
            : undefined,
          alimentos: {
            create: alimentosIds,
          },
        },
        include: {
          tortilla: true,
          salsa: true,
        },
      });

      return this.mapToTacoModel(tacoCreado);
    } catch (error) {
      console.error("Error al crear taco:", error);
      throw new Error("Error al crear taco en la base de datos");
    }
  }

  public async deleteTaco(id: string): Promise<boolean> {
    try {
      await this.prisma.taco.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(`Error al eliminar el taco con ID ${id}:`, error);
      return false;
    }
  }

  //#region UTILS

  public async getTacoMasEconomico(): Promise<ITaco | null> {
    const tacos = await this.getTacos();
    if (tacos.length === 0) return null;
    return tacos.reduce((prev, curr) => {
      return this.getPrecioCosto(prev) < this.getPrecioCosto(curr)
        ? prev
        : curr;
    }, tacos[0]);
  }

  public async getTacoMasCostoso(): Promise<ITaco | null> {
    const tacos = await this.getTacos();
    if (tacos.length === 0) return null;
    return tacos.reduce((prev, curr) => {
      return this.getPrecioCosto(prev) > this.getPrecioCosto(curr)
        ? prev
        : curr;
    }, tacos[0]);
  }

  public async getValorPromedioDeUnTaco(): Promise<number> {
    const tacos = await this.getTacos();
    if (tacos.length === 0) return 0;
    const totalCosto = tacos.reduce(
      (sum, taco) => sum + this.getPrecioCosto(taco),
      0
    );
    return totalCosto / tacos.length;
  }

  private mapToTacoModel(tacoDb: any): ITaco {
    const tortilla = new Tortilla(
      tacoDb.tortilla.nombre,
      tacoDb.tortilla.precio,
      tacoDb.tortilla.tipoTortilla
    );
    // Asignar ID a la tortilla
    tortilla.id = tacoDb.tortilla.id;

    let salsa = undefined;
    if (tacoDb.salsa) {
      salsa = new Alimento(
        tacoDb.salsa.nombre,
        tacoDb.salsa.tipoAlimento,
        tacoDb.salsa.precio
      );
      // Asignar ID a la salsa
      salsa.id = tacoDb.salsa.id;
    }

    const alimentos: IAlimento[] = tacoDb.alimentos
      ? tacoDb.alimentos.map((rel: any) => {
          const alimento = new Alimento(
            rel.alimento.nombre,
            rel.alimento.tipoAlimento,
            rel.alimento.precio
          );
          // Asignar ID al alimento
          alimento.id = rel.alimento.id;
          return alimento;
        })
      : [];

    const taco = new Taco(tortilla, salsa, alimentos);
    return taco;
  }

  private getPrecioCosto(taco: ITaco): number {
    const precioTortilla = taco.tortilla.precio;
    const precioSalsa = taco.salsa ? taco.salsa.precio : 0;
    const precioAlimentos = taco.alimentos.reduce(
      (sum, alimento) => sum + alimento.precio,
      0
    );
    return precioTortilla + precioSalsa + precioAlimentos;
  }
}
