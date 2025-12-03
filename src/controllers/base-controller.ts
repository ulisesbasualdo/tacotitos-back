export interface Delegate<T> {
  findUnique(args: { where: { id: number } }): Promise<T | null>;
  findMany(args?: any): Promise<T[]>;
  findFirst(args?: any): Promise<T | null>;
  create(args: { data: any }): Promise<T>;
  update(args: { where: { id: number }; data: any }): Promise<T>;
  delete(args: { where: { id: number } }): Promise<T>;
}

export class BaseController<T, CreateType> {
  constructor(protected dbDelegate: Delegate<T>) {}

  public async get(id: number): Promise<T | null> {
    return this.dbDelegate.findUnique({
      where: { id },
    });
  }

  public async getAll(): Promise<T[]> {
    return this.dbDelegate.findMany();
  }

  public async getFirst(): Promise<T | null> {
    return this.dbDelegate.findFirst();
  }

  public async create(data: CreateType): Promise<T> {
    return this.dbDelegate.create({
      data,
    });
  }

  public async update(id: number, data: CreateType): Promise<T> {
    if (!id) {
      throw new Error("Id debe ser provisto");
    }
    return this.dbDelegate.update({
      where: { id },
      data,
    });
  }

  public async delete(id: number): Promise<void> {
    await this.dbDelegate.delete({
      where: { id },
    });
  }
}
