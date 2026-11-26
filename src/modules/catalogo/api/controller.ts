import type { RequestHandler } from 'express';
import { ListProdutosUseCase } from '../app/useCases/ListProdutosUseCase';
export const listProdutos: RequestHandler = () => { new ListProdutosUseCase().execute(); };
