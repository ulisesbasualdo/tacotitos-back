import { IAlimento } from "./i-alimento";
import { ITacoContent } from "./i-taco-content";

export interface ITaco {
    id?: string;
    tortilla: ITacoContent
    salsa?: IAlimento;
    alimentos: IAlimento[];
}

export interface ITacoStats {
    valor: number | null;
    tipoTortilla: string | null;
    salsa: string | null;
    alimentos: string[] | null;
}