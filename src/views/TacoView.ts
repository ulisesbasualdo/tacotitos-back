import { TacoController } from "../controllers/TacoController";
import { ITacoStats } from "../interfaces/i-taco";

export class TacoView {
  tacoController = new TacoController();

  public getCheapestTaco(): Promise<ITacoStats | null> {
    return this.tacoController.getCheapestTaco();
  }

  public getMostExpensiveTaco(): Promise<ITacoStats | null> {
    return this.tacoController.getMostExpensiveTaco();
  }

  public getAverageTacoPrice(): Promise<number> {
    return this.tacoController.getAverageTacoPrice();
  }
}