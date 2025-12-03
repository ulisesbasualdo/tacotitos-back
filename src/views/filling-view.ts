import { FillingController } from "../controllers/filling-controller";
import { TacoContent } from "../interfaces/taco-content";

type CreateFilling = Pick<TacoContent, "name" | "price">;

export class FillingView {
  fillingController = new FillingController();

  // Fillings
  public get(): Promise<TacoContent[]> {
    return this.fillingController.getAll();
  }

  public add(filling: CreateFilling): Promise<TacoContent> {
    return this.fillingController.create(filling);
  }

  public update(id: number, data: TacoContent): Promise<TacoContent> {
    return this.fillingController.update(id, data);
  }

  public delete(id: number): Promise<void> {
    return this.fillingController.delete(id);
  }
}
