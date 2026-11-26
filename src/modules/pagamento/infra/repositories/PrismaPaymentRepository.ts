import type { Payment } from '../../domain/entities/Payment';
import { notImplemented } from '../../../../shared/errors/AppError';
export class PrismaPaymentRepository {
  async findById(_id: string): Promise<Payment | null> { return notImplemented(); }
}
