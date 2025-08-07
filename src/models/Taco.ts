import { IAlimento } from "../interfaces/i-alimento";
import { ITaco } from "../interfaces/i-taco";
import { ITacoContent } from "../interfaces/i-taco-content";

export class Taco implements ITaco {
  private _salsa?: IAlimento;
  get salsa(): IAlimento {
    if (this._salsa) {
      return this._salsa;
    }
    throw new Error("Salsa no está disponible");
  }
  set salsa(value: IAlimento | undefined) {
    if (value && value.tipoAlimento !== "salsa") {
      throw new Error("El alimento proporcionado no es una salsa");
    }
    this._salsa = value;
  }
  private _tortilla: ITacoContent;
  get tortilla(): ITacoContent {
    return this._tortilla;
  }
  set tortilla(value: ITacoContent) {
    this._tortilla = value;
  }
  private _alimentos: IAlimento[] = [];
  get alimentos(): IAlimento[] {
    return this._alimentos;
  }
  set alimentos(value: IAlimento[]) {
    this._alimentos = value;
  }

  constructor(
    tortilla: ITacoContent,
    salsa?: IAlimento,
    alimentos: IAlimento[] = []
  ) {
    this._salsa = salsa;
    this._tortilla = tortilla;
    this._alimentos = alimentos;
  }

  getPrecioCosto(): number {
    let costo = this._tortilla.precio;

    if (this._salsa) {
      costo += this._salsa.precio;
    }
    // Sumar el costo de todos los alimentos
    if (this._alimentos.length > 0) {
      costo += this._alimentos.reduce(
        (sum, alimento) => sum + alimento.precio,
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
      tortilla: {
        id: this._tortilla.id,
        nombre: this._tortilla.nombre,
        precio: this._tortilla.precio,
      },
      alimentos: this._alimentos.map((alimento) => ({
        id: alimento.id,
        nombre: alimento.nombre,
        precio: alimento.precio,
        tipoAlimento: alimento.tipoAlimento,
      })),
      precio: this.getPrecioCosto(), // Añadir precio total
    };

    if (this._salsa) {
      result.salsa = {
        id: this._salsa.id,
        nombre: this._salsa.nombre,
        precio: this._salsa.precio,
        tipoAlimento: this._salsa.tipoAlimento,
      };
    }

    return result;
  }
}
