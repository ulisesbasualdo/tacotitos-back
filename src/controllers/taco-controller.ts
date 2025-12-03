import { TacoStats } from "../interfaces/taco-stats";
import { TacoContentController } from "./tortilla-controller";
import { SauceController } from "./sauce-controller";
import { FillingController } from "./filling-controller";

export class TacoController {
  private readonly sauceController: SauceController;
  private readonly fillingController: FillingController;
  private readonly tortillaController: TacoContentController;

  constructor() {
    this.sauceController = new SauceController();
    this.fillingController = new FillingController();
    this.tortillaController = new TacoContentController();
  }

  public async getCheapestTaco(): Promise<TacoStats | null> {
    const cheapestSauce = await this.sauceController.getCheapestSauce();
    const cheapestFilling =
      await this.fillingController.getCheapestFilling();
    const cheapestTortilla =
      await this.tortillaController.getCheapestTortilla();

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
  }

  public async getMostExpensiveTaco(): Promise<TacoStats | null> {
    const expensiveSauce =
      await this.sauceController.getMostExpensiveSauce();
    const expensiveFilling =
      await this.fillingController.getMostExpensiveFilling();
    const expensiveTortilla =
      await this.tortillaController.getMostExpensiveTortilla();

    if (!expensiveTortilla || !expensiveFilling) {
      return null;
    }

    // Un taco puede tener hasta 5 rellenos
    const allFillings = await this.fillingController.getAll();
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
  }

  public async getAverageTacoPrice(): Promise<number> {
    const averageSaucePrice =
      await this.sauceController.getAverageSaucePrice();
    const averageFillingPrice =
      await this.fillingController.getAverageFillingPrice();
    const averageTortillaPrice =
      await this.tortillaController.getAverageTortillaPrice();

    // Asumimos un taco promedio con 1 tortilla, 2.5 rellenos (promedio entre 1 y 5)
    // y 50% de probabilidad de tener salsa
    const averageTacoPrice =
      averageTortillaPrice +
      averageFillingPrice * 2.5 +
      averageSaucePrice * 0.5;

    return averageTacoPrice;
  }
}
