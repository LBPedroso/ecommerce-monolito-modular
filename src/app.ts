import 'dotenv/config';
import express, { type ErrorRequestHandler } from 'express';
import { prisma } from './shared/infra/database/prisma';
import { requestId } from './shared/infra/http/middlewares/requestId';
import { httpLogger, logger } from './shared/infra/observability/logger';
import { metricsMiddleware, registry } from './shared/infra/observability/metrics';
import { AppError } from './shared/errors/AppError';
import { catalogoRoutes } from './modules/catalogo/api/routes';
import { carrinhoRoutes } from './modules/carrinho/api/routes';
import { pedidosRoutes } from './modules/pedidos/api/routes';
import { pagamentoRoutes } from './modules/pagamento/api/routes';
import { usuariosRoutes } from './modules/usuarios/api/routes';

export const app = express();
app.disable('x-powered-by');
app.use(requestId, httpLogger, metricsMiddleware, express.json({ limit: '100kb' }));

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'ok' });
  } catch (error) {
    logger.error({ err: error, requestId: res.locals.requestId }, 'Healthcheck do banco falhou');
    res.status(503).json({ status: 'unavailable', database: 'unavailable', requestId: res.locals.requestId });
  }
});

app.get('/metrics', async (_req, res, next) => {
  try {
    res.set('Content-Type', registry.contentType).send(await registry.metrics());
  } catch (error) {
    next(error);
  }
});

app.use('/v1/catalogo', catalogoRoutes);
app.use('/v1/carrinho', carrinhoRoutes);
app.use('/v1', pedidosRoutes);
app.use('/v1/pagamentos', pagamentoRoutes);
app.use('/v1/usuarios', usuariosRoutes);
app.use((_req, _res, next) => next(new AppError(404, 'NOT_FOUND', 'Rota nao encontrada.')));

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: { code: error.code, message: error.message }, requestId: res.locals.requestId });
    return;
  }
  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    res.status(400).json({ error: { code: 'INVALID_JSON', message: 'JSON invalido.' }, requestId: res.locals.requestId });
    return;
  }
  if (error instanceof Error && 'status' in error && error.status === 413) {
    res.status(413).json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Corpo da requisicao muito grande.' }, requestId: res.locals.requestId });
    return;
  }
  logger.error({ err: error, requestId: res.locals.requestId }, 'Erro interno');
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Erro interno.' }, requestId: res.locals.requestId });
};
app.use(errorHandler);
