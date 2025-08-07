import { IAlimento, TTipoAlimento } from "../interfaces/i-alimento";

export class Alimento implements IAlimento {
  private _id?: string;
  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }

  private _nombre: string;
  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  private _tipoAlimento: TTipoAlimento;
  public get tipoAlimento(): TTipoAlimento {
    return this._tipoAlimento;
  }
  public set tipoAlimento(value: TTipoAlimento) {
    this._tipoAlimento = value;
  }
  private _precio: number;
  public get precio(): number {
    return this._precio;
  }
  public set precio(value: number) {
    this._precio = value;
  }

  constructor(
    nombre: string,
    tipoAlimento: TTipoAlimento,
    precio: number,
    id?: string
  ) {
    this._nombre = nombre;
    this._tipoAlimento = tipoAlimento;
    this._precio = precio;
    this._id = id;
  }

  getPrecioCosto(): number {
    return this.precio;
  }
}
