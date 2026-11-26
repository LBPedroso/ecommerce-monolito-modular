import type { IProductRepository } from '../../domain/repositories/IProductRepository';
import { notImplemented } from '../../../../shared/errors/AppError';
export class PrismaProductRepository implements IProductRepository {
  async list(): Promise<never> { return notImplemented(); }
}
