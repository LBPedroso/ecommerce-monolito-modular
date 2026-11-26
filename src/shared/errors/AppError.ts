export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function notImplemented(): never {
  throw new AppError(501, 'NOT_IMPLEMENTED', 'Funcionalidade ainda nao implementada.');
}
