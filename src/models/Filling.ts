import { TacoContent } from "../interfaces/taco-content";

export class Filling implements TacoContent {

  private _id: number;
  public get id(): number{
    return this._id;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  private _price: number;
  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }

  /**
   * amount es la referencia a la cantidad de un mismo alimento en una tortilla,
   * NO es la cantidad total de alimentos, ya que se hace referencia a un solo alimento.
   */
  private _amount: number;
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number){
    if (value < 1) throw new Error("La cantidad mínima es 1");
    if (value > 5) throw new Error("No puede haber más de 5 alimentos");
    this._amount = value
  }


  constructor(name: string, price: number, amount: number) {
    this._name = name;
    this._price = price;
    this._amount = amount;
    this._id = this.generateId();
  }

  generateId(): number {
    return this._id++;
  }
}


