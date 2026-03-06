import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/programs';

describe(`[PUT] ${endpoint}/:id - Update program`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully update a program', async () => {
      const payload = {
        name: 'Programa Atualizado',
        duration_weeks: 10,
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${endpoint}/1`)
        .send(payload);

      expect(status).toBe(200);

      expect(body).toHaveProperty('id');
      expect(body.id).toBe(1);
      expect(body.name).toBe(payload.name);
      expect(body.duration_weeks).toBe(payload.duration_weeks);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the program is not found', async () => {
      const payload = {
        name: 'Nome Atualizado',
      };

      const { body, status } = await request(app.getHttpServer())
        .put(`${endpoint}/999`)
        .send(payload);

      expect(status).toBe(404);
      expect(body.message).toBe('Program not found');
    });
  });
});
