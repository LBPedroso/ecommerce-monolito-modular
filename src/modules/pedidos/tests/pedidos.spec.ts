import { expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
it('retorna 501 para checkout ainda nao implementado', async () => {
  const response = await request(app).post('/v1/checkout');
  expect(response.status).toBe(501);
  expect(response.body.error.code).toBe('NOT_IMPLEMENTED');
});
