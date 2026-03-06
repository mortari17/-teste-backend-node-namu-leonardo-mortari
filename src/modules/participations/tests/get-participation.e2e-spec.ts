import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/participations';

describe(`[GET] ${endpoint}/:id - Get participation by id`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully get a participation by id', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        `${endpoint}/1`,
      );

      expect(status).toBe(200);

      expect(body).toHaveProperty('id');
      expect(typeof body.id).toBe('number');
    });
  });

  describe('Error', () => {
    it('Should throw an error when the participation is not found', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        `${endpoint}/999`,
      );

      expect(status).toBe(404);
      expect(body.message).toBe('Participation not found');
    });
  });
});
