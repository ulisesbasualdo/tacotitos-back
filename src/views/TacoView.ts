import { TacoController } from "../controllers/TacoController";
import { ITacoStats } from "../interfaces/i-taco";
import { TacoContentController } from '../controllers/TacoContentController';
export class TacoView {
    tacoController = new TacoController();
    tacoContentController = new TacoContentController();

    public mostrarTacoMasEconomico(): Promise<ITacoStats | null> {
        return this.tacoController.getCheapestTaco();
    }
    public mostrarTacoMasCostoso(): Promise<ITacoStats | null> {
        return this.tacoController.getExpensiveTaco();
    }
    public mostrarValorPromedioDeUnTaco(): Promise<number> {
        return this.tacoController.getAverageTacoPrice();
    }

}