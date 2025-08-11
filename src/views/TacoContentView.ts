import { TacoContentController } from "../controllers/TacoContentController";
import { ITacoContent } from "../interfaces/i-taco-content";

export class TacoContentView {
  tacoContentControler = new TacoContentController();

  public getTiposTortilla(): Promise<ITacoContent[]> {
    return this.tacoContentControler.getTortillas();
  }

  public async addTortilla(tortilla: ITacoContent): Promise<ITacoContent> {
    try {
      return await this.tacoContentControler.crearTortilla(tortilla);
    } catch (error) {
      console.error("Error en TacoContentView.addTortilla: ", error);
      throw error;
    }
  }

  public async updateTortilla(
    id: string,
    tortillaData: ITacoContent
  ): Promise<ITacoContent> {
    try {
      return await this.tacoContentControler.updateTortilla(id, tortillaData);
    } catch (error) {
      console.error("Error en TacoContentView.updateTortilla: ", error);
      throw error;
    }
  }

  public async deleteTortilla(id: string): Promise<void> {
    try {
      return await this.tacoContentControler.deleteTortilla(id);
    } catch (error) {
      console.error("Error en TacoContentView.deleteTortilla: ", error);
      throw error;
    }
  }
}
