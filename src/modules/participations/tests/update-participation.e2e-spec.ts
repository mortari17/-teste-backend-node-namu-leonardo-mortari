import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/participations';

describe(`[PUT] ${endpoint}/:id - Update participation`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to update a participation with multiple fields', async () => {
      const payload = {
        user_name: 'João Silva Atualizado',
        notes: 'Participação atualizada com sucesso',
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${endpoint}/1`)
        .send(payload);

      expect(status).toBe(200);

      expect(body).toHaveProperty('id');
      expect(body.user_name).toBe(payload.user_name);
      expect(body.notes).toBe(payload.notes);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the participation is not found', async () => {
      const payload = {
        notes: 'Notas para participação que não existe',
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${endpoint}/999`)
        .send(payload);

      expect(status).toBe(404);
      expect(body.message).toBe('Participation not found');
    });
  });
});
