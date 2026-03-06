import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/participations';

describe(`[DELETE] ${endpoint}/:id - Delete participation`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully delete a participation', async () => {
      const { status } = await request(app.getHttpServer()).delete(
        `${endpoint}/3`,
      );

      expect(status).toBe(200);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the participation is not found', async () => {
      const { body, status } = await request(app.getHttpServer()).delete(
        `${endpoint}/999`,
      );

      expect(status).toBe(404);
      expect(body.message).toBe('Participation not found');
    });
  });
});
