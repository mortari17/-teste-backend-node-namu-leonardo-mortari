import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const base_endpoint = '/programs/1/summary';

describe(`[GET] ${base_endpoint} - Get program summary`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully get program summary', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        base_endpoint,
      );

      expect(status).toBe(200);

      expect(body).toHaveProperty('total_activities');

      expect(body).toHaveProperty('total_participations');

      expect(body).toHaveProperty('top_participants');
      expect(Array.isArray(body.top_participants)).toBe(true);

      if (body.top_participants.length) {
        expect(body.top_participants[0]).toHaveProperty('user_name');

        expect(body.top_participants[0]).toHaveProperty('participations');
      }
    });
  });
});
