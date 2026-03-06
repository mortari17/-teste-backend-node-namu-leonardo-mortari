import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const base_endpoint = '/activities';

describe(`[PUT] ${base_endpoint}/:activity_id - Update activity`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully update an activity', async () => {
      const payload = {
        title: 'Sessão Atualizada',
        duration_minutes: 60,
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${base_endpoint}/2`)
        .send(payload);

      expect(status).toBe(200);

      expect(body).toHaveProperty('id');
      expect(body.id).toBe(2);
      expect(body.title).toBe(payload.title);
      expect(body.duration_minutes).toBe(payload.duration_minutes);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the activity is not found', async () => {
      const payload = {
        title: 'Outro título',
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${base_endpoint}/999`)
        .send(payload);

      expect(status).toBe(404);
      expect(body.message).toBe('Activity not found');
    });
  });
});
