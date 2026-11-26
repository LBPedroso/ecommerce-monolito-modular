import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import { notImplemented } from '../../../../shared/errors/AppError';
export class PrismaUserRepository implements IUserRepository {
  async findByEmail(_email: string): Promise<never> { return notImplemented(); }
}
