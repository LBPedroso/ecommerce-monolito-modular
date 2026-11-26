import type { Order } from '../entities/Order';
export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
}
