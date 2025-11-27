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
    return this.ingredientController.updateFilling(id, data);
  }

  public deleteFilling(id: number): Promise<void> {
    return this.ingredientController.deleteFilling(id);
  }

  // Sauces
  public getSauces(): Promise<TacoContent[]> {
    return this.ingredientController.getSauces();
  }

  public addSauce(sauce: Partial<TacoContent>): Promise<TacoContent> {
    return this.ingredientController.createSauce(sauce);
  }

  public updateSauce(id: number, data: TacoContent): Promise<TacoContent> {
    return this.ingredientController.updateSauce(id, data);
  }

  public deleteSauce(id: number): Promise<void> {
    return this.ingredientController.deleteSauce(id);
  }
}
