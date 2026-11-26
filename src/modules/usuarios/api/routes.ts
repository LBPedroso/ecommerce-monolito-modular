import { Router } from 'express';
import { signup, login } from './controller';
export const usuariosRoutes = Router();
usuariosRoutes.post('/signup', signup);
usuariosRoutes.post('/login', login);
