import { TacoContentController } from "../controllers/tortilla-controller";
import { TacoContent } from "../interfaces/taco-content";

type CreateTortilla = Pick<TacoContent, "name" | "price">
export class TortillaView {
  tacoContentController = new TacoContentController();

  public get(): Promise<TacoContent[]> {
    return this.tacoContentController.getAll();
  }

  public async add(
    tortilla: CreateTortilla
  ): Promise<TacoContent> {
    return await this.tacoContentController.create(tortilla);
  }

  public async update(
    id: number,
    tortillaData: TacoContent
  ): Promise<TacoContent> {
    return await this.tacoContentController.update(id, tortillaData);
  }

  public async delete(id: number): Promise<void> {
    return await this.tacoContentController.delete(id);
  }
}
