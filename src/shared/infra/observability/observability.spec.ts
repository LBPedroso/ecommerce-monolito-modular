import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

vi.mock('../database/prisma', () => ({ prisma: { $queryRaw: vi.fn() } }));
import { prisma } from '../database/prisma';
import { app } from '../../../app';

describe('observabilidade', () => {
  beforeEach(() => { vi.mocked(prisma.$queryRaw).mockReset(); });

  it('verifica a conexao e propaga o request id', async () => {
    vi.mocked(prisma.$queryRaw).mockResolvedValue([{ '?column?': 1 }]);
    const response = await request(app).get('/health').set('x-request-id', 'health-test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', database: 'ok' });
    expect(response.headers['x-request-id']).toBe('health-test');
    expect(prisma.$queryRaw).toHaveBeenCalledOnce();
  });

  it('indica indisponibilidade quando o banco falha', async () => {
    vi.mocked(prisma.$queryRaw).mockRejectedValue(new Error('database unavailable'));
    const response = await request(app).get('/health');
    expect(response.status).toBe(503);
    expect(response.body).toEqual({ status: 'unavailable', database: 'unavailable', requestId: response.headers['x-request-id'] });
  });

  it('substitui identificador invalido e expoe metricas Prometheus', async () => {
    const first = await request(app).get('/missing').set('x-request-id', 'invalid id');
    expect(first.status).toBe(404);
    expect(first.headers['x-request-id']).toMatch(/^[a-f0-9-]{36}$/);
    expect(first.body.requestId).toBe(first.headers['x-request-id']);
    const metrics = await request(app).get('/metrics');
    expect(metrics.status).toBe(200);
    expect(metrics.headers['content-type']).toContain('text/plain');
    expect(metrics.text).toContain('http_requests_total');
    expect(metrics.text).toContain('http_request_duration_seconds');
    expect(metrics.text).toMatch(/http_requests_total\{method="GET",status_code="404"\} [1-9]/);
  });

  it('responde com erro estruturado para JSON invalido', async () => {
    const response = await request(app).post('/v1/carrinho/items')
      .set('Content-Type', 'application/json').send('{');
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_JSON');
    expect(response.body.requestId).toBe(response.headers['x-request-id']);
  });
});
