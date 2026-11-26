import type { Cart } from '../entities/Cart';
export interface ICartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
}
