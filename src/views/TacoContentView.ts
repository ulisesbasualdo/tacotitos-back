import { TacoContentController } from "../controllers/taco-content-controller";
import { TacoContent } from "../interfaces/taco-content";

export class TacoContentView {
  tacoContentController = new TacoContentController();

  public listTortillas(): Promise<TacoContent[]> {
    return this.tacoContentController.listTortillas();
  }

  public async addTortilla(
    tortilla: Partial<TacoContent>
  ): Promise<TacoContent> {
    return await this.tacoContentController.createTortilla(tortilla);
  }

  public async updateTortilla(
    id: number,
    tortillaData: TacoContent
  ): Promise<TacoContent> {
    return await this.tacoContentController.replaceTortilla(id, tortillaData);
  }

  public async deleteTortilla(id: number): Promise<void> {
    return await this.tacoContentController.removeTortilla(id);
  }
}
