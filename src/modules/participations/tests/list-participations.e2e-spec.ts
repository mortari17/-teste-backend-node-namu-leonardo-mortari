import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/participations';

describe(`[GET] ${endpoint} - List participations`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully list participations', async () => {
      const { body, status } = await request(app.getHttpServer()).get(endpoint);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0]).toHaveProperty('id');
        expect(body.data[0]).toHaveProperty('user_name');
        expect(body.data[0]).toHaveProperty('activity_id');
      }
    });

    it('Should be able to filter participations by id', async () => {
      const query = { id: 1 };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].id).toBe(query.id);
      }
    });

    it('Should be able to filter participations by user_name', async () => {
      const query = { user_name: 'João' };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].user_name).toContain(query.user_name);
      }
    });

    it('Should be able to filter participations by activity_id', async () => {
      const query = { activity_id: 1 };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].activity_id).toBe(query.activity_id);
      }
    });

    it('Should be able to filter participations by date', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const query = {
        date_start: yesterday.toISOString(),
        date_end: new Date().toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      expect(body).toHaveProperty('page');
      expect(body).toHaveProperty('page_size');
      expect(body).toHaveProperty('total');
    });
  });

  describe('Error', () => {
    it('Should throw an error when only date_start is provided', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const query = {
        date_start: yesterday.toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(400);
      expect(body.message).toContain('Both date_start and date_end');
    });

    it('Should throw an error when only date_end is provided', async () => {
      const query = {
        date_end: new Date().toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(400);
      expect(body.message).toContain('Both date_start and date_end');
    });

    it('Should throw an error when date_start is after date_end', async () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const query = {
        date_start: tomorrow.toISOString(),
        date_end: today.toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(400);
      expect(body.message).toContain('date_start must be before date_end');
    });
  });
});
