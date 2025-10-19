import { IFilling, ISauce } from "../interfaces/i-alimento";
import { ITaco } from "../interfaces/i-taco";
import { ITacoContent } from "../interfaces/i-taco-content";

export class Taco implements ITaco {
  private _id?: number;
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }

  private _sauce?: ISauce;
  get sauce(): ISauce | undefined {
    return this._sauce;
  }
  set sauce(value: ISauce | undefined) {
    this._sauce = value;
  }

  private _tortilla: ITacoContent;
  get tortilla(): ITacoContent {
    return this._tortilla;
  }
  set tortilla(value: ITacoContent) {
    this._tortilla = value;
  }

  private _fillings: IFilling[] = [];
  get fillings(): IFilling[] {
    return this._fillings;
  }
  set fillings(value: IFilling[]) {
    if (value.length < 1 || value.length > 5) {
      throw new Error("Un taco debe tener entre 1 y 5 rellenos");
    }
    this._fillings = value;
  }

  constructor(
    tortilla: ITacoContent,
    fillings: IFilling[] = [],
    sauce?: ISauce,
    id?: number
  ) {
    if (fillings.length < 1 || fillings.length > 5) {
      throw new Error("Un taco debe tener entre 1 y 5 rellenos");
    }
    this._id = id;
    this._tortilla = tortilla;
    this._fillings = fillings;
    this._sauce = sauce;
  }

  getPrecioCosto(): number {
    let costo = this._tortilla.precio;

    if (this._sauce) {
      costo += this._sauce.precio;
    }

    if (this._fillings.length > 0) {
      costo += this._fillings.reduce(
        (sum, filling) => sum + filling.precio,
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
        nombre: this._tortilla.nombre,
        precio: this._tortilla.precio,
      },
      fillings: this._fillings.map((filling) => ({
        id: filling.id,
        nombre: filling.nombre,
        precio: filling.precio,
      })),
      precio: this.getPrecioCosto(),
    };

    if (this._sauce) {
      result.sauce = {
        id: this._sauce.id,
        nombre: this._sauce.nombre,
        precio: this._sauce.precio,
      };
    }

    return result;
  }
}
