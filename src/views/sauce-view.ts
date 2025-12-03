import { SauceController } from "../controllers/sauce-controller";
import { TacoContent } from "../interfaces/taco-content";

type CreateSauce = Pick<TacoContent, "name" | "price">;

export class SauceVIew {
  sauceController = new SauceController();

  // Fillings
  public get(): Promise<TacoContent[]> {
    return this.sauceController.getAll();
  }

  public add(filling: CreateSauce): Promise<TacoContent> {
    return this.sauceController.create(filling);
  }

  public update(id: number, data: TacoContent): Promise<TacoContent> {
    return this.sauceController.update(id, data);
  }

  public delete(id: number): Promise<void> {
    return this.sauceController.delete(id);
  }
}
