import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const baseEndpoint = '/programs/1/activities';

describe(`[GET] ${baseEndpoint}/:activity_id - Get program activity by id`, () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  describe('Success', () => {
    it('Should be able to successfully get an activity by id', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        `${baseEndpoint}/1`,
      );

      expect(status).toBe(200);

      expect(body).toHaveProperty('id');
      expect(typeof body.id).toBe('number');
    });
  });

  describe('Error', () => {
    it('Should throw an error when the activity is not found', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        `${baseEndpoint}/999`,
      );

      expect(status).toBe(404);
      expect(body.message).toBe('Activity not found');
    });
  });
});
