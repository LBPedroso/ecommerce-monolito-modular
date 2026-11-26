import { Router } from 'express';
import { checkout } from './controller';
export const pedidosRoutes = Router();
pedidosRoutes.post('/checkout', checkout);
