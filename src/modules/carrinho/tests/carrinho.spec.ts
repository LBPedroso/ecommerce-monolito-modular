import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
describe('carrinho', () => {
  it('mantem adicao e remocao como stubs', async () => {
    for (const response of [
      await request(app).post('/v1/carrinho/items').send({ productId: 'p', qty: 1 }),
      await request(app).delete('/v1/carrinho/items/123')
    ]) {
      expect(response.status).toBe(501);
      expect(response.body.error.code).toBe('NOT_IMPLEMENTED');
      expect(response.body.requestId).toBe(response.headers['x-request-id']);
    }
  });
});
