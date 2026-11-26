export interface IPaymentGateway {
  charge(orderId: string, amount: string): Promise<{ status: string }>;
}
