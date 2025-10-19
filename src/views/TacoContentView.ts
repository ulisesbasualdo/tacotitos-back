import { TacoContentController } from "../controllers/TacoContentController";
import { ITacoContent } from "../interfaces/i-taco-content";

export class TacoContentView {
  tacoContentController = new TacoContentController();

  public listTortillas(): Promise<ITacoContent[]> {
    return this.tacoContentController.listTortillas();
  }

  public async addTortilla(tortilla: Partial<ITacoContent>): Promise<ITacoContent> {
    try {
      return await this.tacoContentController.createTortilla(tortilla);
    } catch (error) {
      console.error("Error en TacoContentView.addTortilla: ", error);
      throw error;
    }
  }

  public async updateTortilla(
    id: number,
    tortillaData: ITacoContent
  ): Promise<ITacoContent> {
    try {
      return await this.tacoContentController.replaceTortilla(id, tortillaData);
    } catch (error) {
      console.error("Error en TacoContentView.updateTortilla: ", error);
      throw error;
    }
  }

  public async deleteTortilla(id: number): Promise<void> {
    try {
      return await this.tacoContentController.removeTortilla(id);
    } catch (error) {
      console.error("Error en TacoContentView.deleteTortilla: ", error);
      throw error;
    }
  }
}
