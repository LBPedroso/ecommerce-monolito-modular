import { expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
it('nao simula sucesso de pagamento ainda nao implementado', async () => {
  const response = await request(app).post('/v1/pagamentos');
  expect(response.status).toBe(501);
  expect(response.body.error.code).toBe('NOT_IMPLEMENTED');
});
