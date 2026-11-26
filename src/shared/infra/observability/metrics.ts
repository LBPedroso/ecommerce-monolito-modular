import type { RequestHandler } from 'express';
import { collectDefaultMetrics, Counter, Histogram, Registry } from 'prom-client';

export const registry = new Registry();
collectDefaultMetrics({ register: registry });

const requests = new Counter({
  name: 'http_requests_total',
  help: 'Total de respostas HTTP.',
  labelNames: ['method', 'status_code'] as const,
  registers: [registry]
});
const duration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duracao das requisicoes HTTP em segundos.',
  labelNames: ['method', 'status_code'] as const,
  registers: [registry]
});

export const metricsMiddleware: RequestHandler = (req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const method = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD', 'OPTIONS'].includes(req.method)
      ? req.method : 'OTHER';
    const labels = { method, status_code: String(res.statusCode) };
    requests.inc(labels);
    duration.observe(labels, Number(process.hrtime.bigint() - start) / 1e9);
  });
  next();
};
