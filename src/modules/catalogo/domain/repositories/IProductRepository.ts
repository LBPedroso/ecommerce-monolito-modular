import type { Product } from '../entities/Product';
export interface IProductRepository {
  list(): Promise<Product[]>;
}
