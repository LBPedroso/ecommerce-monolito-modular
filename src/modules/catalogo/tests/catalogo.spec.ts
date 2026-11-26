import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';

describe('catalogo', () => {
  it('retorna 501 estruturado ate implementar a listagem', async () => {
    const response = await request(app).get('/v1/catalogo/produtos').set('x-request-id', 'catalogo-test');
    expect(response.status).toBe(501);
    expect(response.body).toEqual({ error: { code: 'NOT_IMPLEMENTED', message: expect.any(String) }, requestId: 'catalogo-test' });
    expect(response.headers['x-request-id']).toBe('catalogo-test');
  });
});
