import { PrismaClient } from "@prisma/client";
import { ITacoStats } from "../interfaces/i-taco";
import { IngredientController } from "./IngredientController";
import { TacoContentController } from "./TacoContentController";

export class TacoController {
  private readonly prisma: PrismaClient;
  private readonly ingredientController: IngredientController;
  private readonly tortillaController: TacoContentController;

  constructor() {
    this.prisma = new PrismaClient();
    this.ingredientController = new IngredientController();
    this.tortillaController = new TacoContentController();
  }

  public async getCheapestTaco(): Promise<ITacoStats | null> {
    try {
      const cheapestSauce = await this.ingredientController.getCheapestSauce();
      const cheapestFilling = await this.ingredientController.getCheapestFilling();
      const cheapestTortilla = await this.tortillaController.getCheapestTortilla();

      if (!cheapestTortilla || !cheapestFilling) {
        return null;
      }

      const valorTotal =
        cheapestTortilla.precio +
        (cheapestSauce?.precio || 0) +
        cheapestFilling.precio;

      const cheapestTaco: ITacoStats = {
        value: valorTotal,
        tortillaType: cheapestTortilla.nombre,
        sauce: cheapestSauce?.nombre || null,
        fillings: [cheapestFilling.nombre],
      };

      return cheapestTaco;
    } catch (error) {
      console.error("Error al obtener el taco más barato:", error);
      throw new Error("Error al obtener el taco más barato: " + error);
    }
  }

  public async getMostExpensiveTaco(): Promise<ITacoStats | null> {
    try {
      const expensiveSauce = await this.ingredientController.getMostExpensiveSauce();
      const expensiveFilling = await this.ingredientController.getMostExpensiveFilling();
      const expensiveTortilla = await this.tortillaController.getMostExpensiveTortilla();

      if (!expensiveTortilla || !expensiveFilling) {
        return null;
      }

      // Un taco puede tener hasta 5 rellenos
      const allFillings = await this.ingredientController.getFillings();
      const top5Fillings = allFillings
        .sort((a, b) => b.precio - a.precio)
        .slice(0, 5);

      const valorTotal =
        expensiveTortilla.precio +
        (expensiveSauce?.precio || 0) +
        top5Fillings.reduce((sum, f) => sum + f.precio, 0);

      const expensiveTaco: ITacoStats = {
        value: valorTotal,
        tortillaType: expensiveTortilla.nombre,
        sauce: expensiveSauce?.nombre || null,
        fillings: top5Fillings.map((f) => f.nombre),
      };

      return expensiveTaco;
    } catch (error) {
      console.error("Error al obtener el taco más costoso:", error);
      throw new Error("Error al obtener el taco más costoso: " + error);
    }
  }

  public async getAverageTacoPrice(): Promise<number> {
    try {
      const averageSaucePrice = await this.ingredientController.getAverageSaucePrice();
      const averageFillingPrice = await this.ingredientController.getAverageFillingPrice();
      const averageTortillaPrice = await this.tortillaController.getAverageTortillaPrice();

      // Asumimos un taco promedio con 1 tortilla, 2.5 rellenos (promedio entre 1 y 5)
      // y 50% de probabilidad de tener salsa
      const averageTacoPrice =
        averageTortillaPrice +
        averageFillingPrice * 2.5 +
        averageSaucePrice * 0.5;

      return averageTacoPrice;
    } catch (error) {
      console.error("Error al calcular el precio promedio del taco:", error);
      throw new Error("Error al calcular el precio promedio del taco: " + error);
    }
  }
}
