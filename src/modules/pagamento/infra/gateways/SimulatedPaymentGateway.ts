import type { IPaymentGateway } from '../../domain/gateways/IPaymentGateway';
import { notImplemented } from '../../../../shared/errors/AppError';
export class SimulatedPaymentGateway implements IPaymentGateway {
  async charge(_orderId: string, _amount: string): Promise<never> { return notImplemented(); }
}
