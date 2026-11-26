import { Router } from 'express';
import { listProdutos } from './controller';
export const catalogoRoutes = Router();
catalogoRoutes.get('/produtos', listProdutos);
