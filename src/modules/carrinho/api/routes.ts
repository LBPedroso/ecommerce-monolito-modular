import { Router } from 'express';
import { addItem, removeItem } from './controller';
export const carrinhoRoutes = Router();
carrinhoRoutes.post('/items', addItem);
carrinhoRoutes.delete('/items/:itemId', removeItem);
