import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const baseEndpoint = '/activities';

describe(`[DELETE] ${baseEndpoint}/:activity_id - Delete activity`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully delete an activity', async () => {
      const { body, status } = await request(app.getHttpServer()).delete(
        `${baseEndpoint}/6`,
      );

      expect(status).toBe(200);
      expect(body.success).toBe(true);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the activity is not found', async () => {
      const { body, status } = await request(app.getHttpServer()).delete(
        `${baseEndpoint}/999`,
      );

      expect(status).toBe(404);
      expect(body.message).toBe('Activity not found');
    });
  });
});
