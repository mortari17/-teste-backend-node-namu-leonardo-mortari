import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const baseEndpoint = '/programs/3/activities';

describe(`[DELETE] ${baseEndpoint}/:activity_id - Delete program activity`, () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  describe('Success', () => {
    it('Should be able to successfully delete a program activity', async () => {
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
