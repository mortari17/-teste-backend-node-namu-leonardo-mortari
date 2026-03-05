import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';
import { EnumProgramCategory } from '@shared/entity/program.entity';

const endpoint = '/programs';

describe(`[GET] ${endpoint} - List programs`, () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  describe('Success', () => {
    it('Should be able to successfully list programs', async () => {
      const { body, status } = await request(app.getHttpServer()).get(endpoint);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0]).toHaveProperty('id');
        expect(typeof body.data[0].id).toBe('number');
        expect(body.data[0]).toHaveProperty('name');
        expect(body.data[0]).toHaveProperty('category');
        expect(body.data[0]).toHaveProperty('duration_weeks');
      }
    });
    it('Should be able to filter programs by name', async () => {
      const query = { name: 'Mindfulness' };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].name).toContain(query.name);
      }
    });
    it('Should be able to filter programs by id', async () => {
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
    it('Should be able to filter programs by category', async () => {
      const query = { category: EnumProgramCategory.MEDITATION };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].category).toBe(query.category);
      }
    });
    it('Should be able to filter programs by duration_weeks', async () => {
      const query = { duration_weeks: 8 };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
      if (body.data.length) {
        expect(body.data[0].duration_weeks).toBe(query.duration_weeks);
      }
    });
    it('Should be able to filter programs by date', async () => {
      const query = {
        date_start: new Date().toISOString(),
        end_date: new Date().toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(200);

      expect(Array.isArray(body.data)).toBe(true);
    });
  });

  describe('Error', () => {
    it('Should throw an error when start_date and end_date are no sent together', async () => {
      const query = {
        date_start: new Date().toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(400);
      expect(body.message).toBe(
        'Both date_start and date_end must be provided together',
      );
    });
    it('Should throw an error when start_date is after end_date', async () => {
      const query = {
        date_start: new Date('2024-01-01').toISOString(),
        date_end: new Date('2023-01-01').toISOString(),
      };

      const { body, status } = await request(app.getHttpServer())
        .get(endpoint)
        .query(query);

      expect(status).toBe(400);
      expect(body.message).toBe('date_start must be before date_end');
    });
  });
});
