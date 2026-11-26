import type { RequestHandler } from 'express';
import { SignupUseCase } from '../app/useCases/SignupUseCase';
import { LoginUseCase } from '../app/useCases/LoginUseCase';
export const signup: RequestHandler = () => { new SignupUseCase().execute(); };
export const login: RequestHandler = () => { new LoginUseCase().execute(); };
