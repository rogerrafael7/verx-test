export interface BaseRepoDomain<Model> {
  create<Payload>(data: Payload): Promise<Model>;
  updateById<Payload>(id: number, data: Payload): Promise<Model>;
  deleteById(id: number): Promise<void>;
  getById(id: number): Promise<Model>;
  getAll(): Promise<Model[]>;
}
