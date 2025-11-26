import { IngredientController } from "../controllers/ingredient-controller";
import { TacoContent } from "../interfaces/taco-content";

export class IngredientView {
  ingredientController = new IngredientController();

  // Fillings
  public getFillings(): Promise<TacoContent[]> {
    return this.ingredientController.getFillings();
  }

  public addFilling(filling: Partial<TacoContent>): Promise<TacoContent> {
    return this.ingredientController.createFilling(filling);
  }

  public updateFilling(id: number, data: TacoContent): Promise<TacoContent> {
    return this.ingredientController.replaceFilling(id, data);
  }

  public deleteFilling(id: number): Promise<void> {
    return this.ingredientController.removeFilling(id);
  }

  // Sauces
  public getSauces(): Promise<TacoContent[]> {
    return this.ingredientController.getSauces();
  }

  public addSauce(sauce: Partial<TacoContent>): Promise<TacoContent> {
    return this.ingredientController.createSauce(sauce);
  }

  public updateSauce(id: number, data: TacoContent): Promise<TacoContent> {
    return this.ingredientController.replaceSauce(id, data);
  }

  public deleteSauce(id: number): Promise<void> {
    return this.ingredientController.removeSauce(id);
  }
}
