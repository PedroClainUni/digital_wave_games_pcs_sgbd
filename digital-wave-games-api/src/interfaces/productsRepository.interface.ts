import {
  PostProductDTO,
  Product,
  PutProductDTO
} from "../models";

export interface IProductsRepository {
  getProducts(): Promise<Product[]>;
  getById(id: number | undefined): Promise<Product | null>;
  save(dto: PostProductDTO): Promise<number[]>;
  // putProduct(dto: PutProductDTO): Promise<void>;
  // deleteProduct(id: number): Promise<void>;
  // buyProduct(quantity: number, id: number): Promise<void>;
}
