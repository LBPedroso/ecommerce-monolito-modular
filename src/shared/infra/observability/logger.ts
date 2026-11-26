import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers.set-cookie']
});

export const httpLogger = pinoHttp({
  logger,
  genReqId: (_req, res) => String(res.getHeader('x-request-id'))
});
