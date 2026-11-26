import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
describe('usuarios', () => {
  it('nao informa sucesso de cadastro ou login ainda nao implementados', async () => {
    for (const path of ['/v1/usuarios/signup', '/v1/usuarios/login']) {
      const response = await request(app).post(path);
      expect(response.status).toBe(501);
      expect(response.body.error.code).toBe('NOT_IMPLEMENTED');
    }
  });
});
