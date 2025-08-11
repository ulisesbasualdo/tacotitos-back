import { PrismaClient } from "@prisma/client";
import { ITaco, ITacoStats } from "../interfaces/i-taco";
import { Alimento } from "../models/Alimento";
import { Taco } from "../models/Taco";
import { Tortilla } from "../models/Tortilla";
import { IAlimento } from "../interfaces/i-alimento";
import { Utils } from "../utils/utils";
import { AlimentoController } from "./AlimentoController";
import { TacoContentController } from "./TacoContentController";

export class TacoController {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //#region UTILS

  public async getCheapestTaco(): Promise<ITacoStats | null> {
    try {
      const cheapestSalsa = await AlimentoController.getCheapestSalsa();
      const cheapestAlimentosDeTortilla =
        await AlimentoController.getCheapestAlimentosDeTortilla();
      const cheapestTortilla =
        await TacoContentController.getCheapestTortilla();

      if (!cheapestSalsa && !cheapestAlimentosDeTortilla && !cheapestTortilla)
        return null;

      const valorTotal =
        (cheapestTortilla?.precio || 0) +
        (cheapestSalsa?.precio || 0) +
        (cheapestAlimentosDeTortilla?.reduce(
          (sum, alimento) => sum + (alimento.precio || 0),
          0
        ) || 0);

      const cheapestTaco: ITacoStats = {
        valor: valorTotal || null,
        tipoTortilla: cheapestTortilla?.nombre || null,
        salsa: cheapestSalsa?.nombre || null,
        alimentos:
          cheapestAlimentosDeTortilla?.map((alimento) => alimento.nombre) ||
          null,
      };

      return cheapestTaco;
    } catch (error) {
      console.error("Error al obtener el taco más barato:", error);
      throw new Error(
        "Error al obtener el taco más barato en la base de datos: " + error
      );
    }
  }

  public async getExpensiveTaco(): Promise<ITacoStats | null> {
    try {
      const expensiveSalsa = await AlimentoController.getExpensiveSalsa();
      const expensiveAlimentosDeTortilla =
        await AlimentoController.getExpensiveAlimentosDeTortilla();
      const expensiveTortilla =
        await TacoContentController.getExpensiveTortilla();

      if (!expensiveSalsa && !expensiveAlimentosDeTortilla && !expensiveTortilla)
        return null;

      const valorTotal =
        (expensiveTortilla?.precio || 0) +
        (expensiveSalsa?.precio || 0) +
        (expensiveAlimentosDeTortilla?.reduce(
          (sum, alimento) => sum + (alimento.precio || 0),
          0
        ) || 0);

      const expensiveTaco: ITacoStats = {
        valor: valorTotal || null,
        tipoTortilla: expensiveTortilla?.nombre || null,
        salsa: expensiveSalsa?.nombre || null,
        alimentos:
          expensiveAlimentosDeTortilla?.map((alimento) => alimento.nombre) ||
          null,
      };

      return expensiveTaco;
    } catch (error) {
      console.error("Error al obtener el taco más costoso:", error);
      throw new Error(
        "Error al obtener el taco más costoso en la base de datos: " + error
      );
    }
  }


  public async getAverageTacoPrice(): Promise<number> {
    const averageSalsaPrice = await AlimentoController.getAverageSalsaPrice();
    const averageAlimentosDeTortilla =
      await AlimentoController.getAverageAlimentosDeTortilla();
    const averageTortilla = await TacoContentController.getAverageTortilla();

    const total = (averageSalsaPrice || 0) + (averageAlimentosDeTortilla || 0) + (averageTortilla || 0);
    const count = [averageSalsaPrice, averageAlimentosDeTortilla, averageTortilla].filter(Boolean).length;

    return count > 0 ? total / count : 0;
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
