import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const baseEndpoint = '/programs/1/activities';

describe(`[PUT] ${baseEndpoint}/:activity_id - Update program activity`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully update a program activity', async () => {
      const payload = {
        title: 'Sessão Atualizada',
        duration_minutes: 60,
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${baseEndpoint}/2`)
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
        .put(`${baseEndpoint}/999`)
        .send(payload);

      expect(status).toBe(404);
      expect(body.message).toBe('Activity not found');
    });
  });
});
