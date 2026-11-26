import type { RequestHandler } from 'express';
import { AddItemCarrinhoUseCase } from '../app/useCases/AddItemCarrinhoUseCase';
import { RemoveItemCarrinhoUseCase } from '../app/useCases/RemoveItemCarrinhoUseCase';
export const addItem: RequestHandler = () => { new AddItemCarrinhoUseCase().execute(); };
export const removeItem: RequestHandler = () => { new RemoveItemCarrinhoUseCase().execute(); };
