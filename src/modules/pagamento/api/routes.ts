import { Router } from 'express';
import { processarPagamento } from './controller';
export const pagamentoRoutes = Router();
pagamentoRoutes.post('/', processarPagamento);
