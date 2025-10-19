import { IngredientController } from "../controllers/IngredientController";
import { IFilling, ISauce } from "../interfaces/i-alimento";

export class IngredientView {
  ingredientController = new IngredientController();

  // Fillings
  public getFillings(): Promise<IFilling[]> {
    return this.ingredientController.getFillings();
  }

  public addFilling(filling: Partial<IFilling>): Promise<IFilling> {
    return this.ingredientController.createFilling(filling);
  }

  public updateFilling(id: number, data: IFilling): Promise<IFilling> {
    return this.ingredientController.replaceFilling(id, data);
  }

  public deleteFilling(id: number): Promise<void> {
    return this.ingredientController.removeFilling(id);
  }

  // Sauces
  public getSauces(): Promise<ISauce[]> {
    return this.ingredientController.getSauces();
  }

  public addSauce(sauce: Partial<ISauce>): Promise<ISauce> {
    return this.ingredientController.createSauce(sauce);
  }

  public updateSauce(id: number, data: ISauce): Promise<ISauce> {
    return this.ingredientController.replaceSauce(id, data);
  }

  public deleteSauce(id: number): Promise<void> {
    return this.ingredientController.removeSauce(id);
  }
}
