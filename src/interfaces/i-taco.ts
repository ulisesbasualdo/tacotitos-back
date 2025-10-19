import { IFilling, ISauce } from "./i-alimento";
import { ITacoContent } from "./i-taco-content";

export interface ITaco {
    id?: number;
    tortilla: ITacoContent;
    sauce?: ISauce;
    fillings: IFilling[];
}

export interface ITacoStats {
    value: number | null;
    tortillaType: string | null;
    sauce: string | null;
    fillings: string[] | null;
}