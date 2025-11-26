import { PrismaClient } from "@prisma/client";
import { TacoStats } from "../interfaces/taco-stats";
import { IngredientController } from "./ingredient-controller";
import { TacoContentController } from "./taco-content-controller";

export class TacoController {
  private readonly prisma: PrismaClient;
  private readonly ingredientController: IngredientController;
  private readonly tortillaController: TacoContentController;

  constructor() {
    this.prisma = new PrismaClient();
    this.ingredientController = new IngredientController();
    this.tortillaController = new TacoContentController();
  }

  public async getCheapestTaco(): Promise<TacoStats | null> {
    try {
      const cheapestSauce = await this.ingredientController.getCheapestSauce();
      const cheapestFilling = await this.ingredientController.getCheapestFilling();
      const cheapestTortilla = await this.tortillaController.getCheapestTortilla();

      if (!cheapestTortilla || !cheapestFilling) {
        return null;
      }

      const valorTotal =
        cheapestTortilla.price +
        (cheapestSauce?.price || 0) +
        cheapestFilling.price;

      const cheapestTaco: TacoStats = {
        value: valorTotal,
        tortillaType: cheapestTortilla.name,
        sauce: cheapestSauce?.name || null,
        fillings: [cheapestFilling.name],
      };

      return cheapestTaco;
    } catch (error) {
      console.error("Error al obtener el taco más barato:", error);
      throw new Error("Error al obtener el taco más barato: " + error);
    }
  }

  public async getMostExpensiveTaco(): Promise<TacoStats | null> {
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
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

      const valorTotal =
        expensiveTortilla.price +
        (expensiveSauce?.price || 0) +
        top5Fillings.reduce((sum, f) => sum + f.price, 0);

      const expensiveTaco: TacoStats = {
        value: valorTotal,
        tortillaType: expensiveTortilla.name,
        sauce: expensiveSauce?.name || null,
        fillings: top5Fillings.map((f) => f.name),
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
