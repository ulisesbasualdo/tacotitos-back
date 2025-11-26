import { TacoController } from "../controllers/TacoController";
import { TacoStats } from "../interfaces/taco-stats";

export class TacoView {
  tacoController = new TacoController();

  public getCheapestTaco(): Promise<TacoStats | null> {
    return this.tacoController.getCheapestTaco();
  }

  public getMostExpensiveTaco(): Promise<TacoStats | null> {
    return this.tacoController.getMostExpensiveTaco();
  }

  public getAverageTacoPrice(): Promise<number> {
    return this.tacoController.getAverageTacoPrice();
  }
}