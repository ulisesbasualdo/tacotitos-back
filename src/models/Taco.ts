import { ITaco } from "../interfaces/i-taco";
import { TacoContent } from "../interfaces/taco-content";

export class Taco implements ITaco {
  private _id: number;
  get id(): number {
    return this._id;
  }

  private _sauce: TacoContent;
  get sauce(): TacoContent {
    return this._sauce;
  }
  set sauce(value: TacoContent) {
    this._sauce = value;
  }

  private _tortilla: TacoContent;
  get tortilla(): TacoContent {
    return this._tortilla;
  }
  set tortilla(value: TacoContent) {
    this._tortilla = value;
  }

  private _doubleTortilla: boolean;
  get doubleTortilla(): boolean{
    return this._doubleTortilla;
  }
  set doubleTortilla(value:boolean) {
    this._doubleTortilla = value;
  }

  private _fillings: TacoContent[] = [];
  get fillings(): TacoContent[] {
    return this._fillings;
  }
  set fillings(value: TacoContent[]) {
    if (value.length < 1 || value.length > 5) {
      throw new Error("Un taco debe tener entre 1 y 5 rellenos");
    }
    this._fillings = value;
  }

  constructor(
    tortilla: TacoContent,
    sauce: TacoContent,
    doubleTortilla: boolean,
    fillings: TacoContent[] = [],
  ) {
    if (fillings.length < 1 || fillings.length > 5) {
      throw new Error("Un taco debe tener entre 1 y 5 rellenos");
    }
    this._id = this.generateId();
    this._tortilla = tortilla;
    this._fillings = fillings;
    this._sauce = sauce;
    this._doubleTortilla = doubleTortilla;
  }

  getPrecioCosto(): number {
    let costo = this._tortilla.price;

    if (this._sauce) {
      costo += this._sauce.price;
    }

    if (this._fillings.length > 0) {
      costo += this._fillings.reduce(
        (sum, filling) => sum + filling.price,
        0
      );
    }

    return costo;
  }

  getPrecioVenta(): number {
    return this.getPrecioCosto() * 1.5;
  }

  toJSON() {
    const result: any = {
      id: this._id,
      tortilla: {
        id: this._tortilla.id,
        nombre: this._tortilla.name,
        precio: this._tortilla.price,
      },
      fillings: this._fillings.map((filling) => ({
        id: filling.id,
        nombre: filling.name,
        precio: filling.price,
      })),
      precio: this.getPrecioCosto(),
    };

    if (this._sauce) {
      result.sauce = {
        id: this._sauce.id,
        nombre: this._sauce.name,
        precio: this._sauce.price,
      };
    }

    return result;
  }

  generateId(): number {
    return this._id++;
  }
}
