import { TacoController } from "../controllers/TacoController";
import { ITaco } from "../interfaces/i-taco";
import { TacoContentController } from '../controllers/TacoContentController';
import { ITacoContent } from "../interfaces/i-taco-content";

export class TacoView {
    tacoController = new TacoController();
    tacoContentController = new TacoContentController();

    public mostrarTacos(): Promise<ITaco[]> {
        return this.tacoController.getTacos();
    }

    public mostrarTacoMasEconomico(): Promise<ITaco | null> {
        return this.tacoController.getTacoMasEconomico();
    }
    public mostrarTacoMasCostoso(): Promise<ITaco | null> {
        return this.tacoController.getTacoMasCostoso();
    }
    public mostrarValorPromedioDeUnTaco(): Promise<number> {
        return this.tacoController.getValorPromedioDeUnTaco();
    }

    public getTortillas(): Promise<ITacoContent[]> {
        return this.tacoContentController.getTortillas();
    }

    public agregarTaco(taco: ITaco): Promise<ITaco | null> {
        return this.tacoController.createTaco(taco);
    }
}