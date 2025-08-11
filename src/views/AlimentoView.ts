import { AlimentoController } from "../controllers/AlimentoController";
import { IAlimento } from "../interfaces/i-alimento";

export class AlimentoView {
  alimentoController = new AlimentoController();

  public getAlimentosTortilla(): Promise<IAlimento[]> {
    return this.alimentoController.getAlimentosTortilla();
  }

  public getSalsas(): Promise<IAlimento[]> {
    return this.alimentoController.getSalsas();
  }

  public addAlimento(alimento:IAlimento): Promise<IAlimento> {
    return this.alimentoController.addAlimento(alimento);
  }

  public updateAlimento(id:string, data:IAlimento): Promise<IAlimento>{
    return this.alimentoController.updateAlimento(id,data);
  }

  public deleteAlimento(id:string): Promise<void>{
    return this.alimentoController.deleteAlimento(id);
  }






}
