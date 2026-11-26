import type { RequestHandler } from 'express';
import { CheckoutUseCase } from '../app/useCases/CheckoutUseCase';
export const checkout: RequestHandler = () => { new CheckoutUseCase().execute(); };
