import type { RequestHandler } from 'express';
import { ProcessarPagamentoUseCase } from '../app/useCases/ProcessarPagamentoUseCase';
export const processarPagamento: RequestHandler = () => { new ProcessarPagamentoUseCase().execute(); };
