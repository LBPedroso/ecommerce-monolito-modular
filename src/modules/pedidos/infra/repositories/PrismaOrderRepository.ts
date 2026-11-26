import type { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { notImplemented } from '../../../../shared/errors/AppError';
export class PrismaOrderRepository implements IOrderRepository {
  async findById(_id: string): Promise<never> { return notImplemented(); }
}
