import { IFilling, ISauce } from "../interfaces/i-alimento";

export class Filling implements IFilling {
  private _id?: number;
  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }

  private _nombre: string;
  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  private _precio: number;
  public get precio(): number {
    return this._precio;
  }
  public set precio(value: number) {
    this._precio = value;
  }

  constructor(nombre: string, precio: number, id?: number) {
    this._nombre = nombre;
    this._precio = precio;
    this._id = id;
  }

  getPrecioCosto(): number {
    return this.precio;
  }
}

export class Sauce implements ISauce {
  private _id?: number;
  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }

  private _nombre: string;
  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  private _precio: number;
  public get precio(): number {
    return this._precio;
  }
  public set precio(value: number) {
    this._precio = value;
  }

  constructor(nombre: string, precio: number, id?: number) {
    this._nombre = nombre;
    this._precio = precio;
    this._id = id;
  }

  getPrecioCosto(): number {
    return this.precio;
  }
}
