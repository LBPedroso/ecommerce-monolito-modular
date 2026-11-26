import type { ICartRepository } from '../../domain/repositories/ICartRepository';
import { notImplemented } from '../../../../shared/errors/AppError';
export class PrismaCartRepository implements ICartRepository {
  async findByUserId(_userId: string): Promise<never> { return notImplemented(); }
}
