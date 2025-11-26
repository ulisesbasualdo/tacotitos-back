import { TacoContent } from "../interfaces/taco-content";

export class Sauce implements TacoContent {
  private _id: number;
  public get id(): number  {
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

  private readonly _amount: number;
  public get amount(): number {
    return this._amount;
  }

  constructor(name: string, price: number) {
    this._name = name;
    this._price = price;
    this._id = this.generateId();
    this._amount = 1;
  }

  generateId(): number {
    return this._id++;
  }
}