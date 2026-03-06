import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';
import { EnumDayOfWeek } from '@shared/entity/activity.entity';

const base_endpoint = '/programs/1/activities';

describe(`[GET] ${base_endpoint} - List activities for a program`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully list activities', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        base_endpoint,
      );

      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0]).toHaveProperty('id');
        expect(typeof body.data[0].id).toBe('number');
        expect(body.data[0]).toHaveProperty('title');
        expect(body.data[0]).toHaveProperty('day_of_week');
        expect(body.data[0]).toHaveProperty('duration_minutes');
      }
    });

    it('Should be able to filter activities by title', async () => {
      const query = { title: 'Respiração' };

      const { body, status } = await request(app.getHttpServer())
        .get(base_endpoint)
        .query(query);

      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].title).toContain(query.title);
      }
    });

    it('Should be able to filter activities by id', async () => {
      const query = { id: 1 };

      const { body, status } = await request(app.getHttpServer())
        .get(base_endpoint)
        .query(query);

      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].id).toBe(query.id);
      }
    });

    it('Should be able to filter activities by day_of_week', async () => {
      const query = { day_of_week: EnumDayOfWeek.MONDAY };

      const { body, status } = await request(app.getHttpServer())
        .get(base_endpoint)
        .query(query);

      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].day_of_week).toBe(query.day_of_week);
      }
    });

    it('Should be able to filter activities by duration_minutes', async () => {
      const query = { duration_minutes: 30 };

      const { body, status } = await request(app.getHttpServer())
        .get(base_endpoint)
        .query(query);

      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].duration_minutes).toBe(query.duration_minutes);
      }
    });

    it('Should be able to filter activities by date range', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const query = {
        date_start: yesterday.toISOString(),
        date_end: new Date().toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(base_endpoint)
        .query(query);

      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
    });
  });
});
