import { TacoContent } from "../interfaces/taco-content";

type TTipoTortilla = "single" | "double";

export class Tortilla implements TacoContent {
  private _id?: number;
  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }
  private _nombre: string;
  public get name(): string {
    return this._nombre;
  }
  public set name(value: string) {
    this._nombre = value;
  }
  private _precio: number;
  public get price(): number {
    return this._precio;
  }
  public set price(value: number) {
    this._precio = value;
  }
  private _tipoTortilla: TTipoTortilla;
  public set tipoTortilla(value: TTipoTortilla) {
    if (value !== "single" && value !== "double") {
      throw new Error(
        "Tipo de tortilla no válido. Debe ser 'single' o 'double'."
      );
    }
    this._tipoTortilla = value;
  }
  public get tipoTortilla(): TTipoTortilla {
    return this._tipoTortilla;
  }

  constructor(
    nombre: string,
    precio: number,
    tipoTortilla: TTipoTortilla,
    id?: number
  ) {
    this._nombre = nombre;
    this._precio = precio;
    this._tipoTortilla = tipoTortilla;
    this._id = id;
  }

  getPrecioCosto(): number {
    return this.price;
  }
}
