import { TacoContentController } from "../controllers/TacoContentController";
import { TacoContent } from "../interfaces/taco-content";

export class TacoContentView {
  tacoContentController = new TacoContentController();

  public listTortillas(): Promise<TacoContent[]> {
    return this.tacoContentController.listTortillas();
  }

  public async addTortilla(tortilla: Partial<TacoContent>): Promise<TacoContent> {
    try {
      return await this.tacoContentController.createTortilla(tortilla);
    } catch (error) {
      console.error("Error en TacoContentView.addTortilla: ", error);
      throw error;
    }
  }

  public async updateTortilla(
    id: number,
    tortillaData: TacoContent
  ): Promise<TacoContent> {
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
