import { TacoContent } from "./taco-content";

export interface ITaco {
  id: number;
  tortilla: TacoContent;
  sauce: TacoContent | null;
  fillings: TacoContent[];
  doubleTortilla: boolean;
}
