import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/programs';

describe(`[GET] ${endpoint} - Get program by id`, () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  describe('Success', () => {
    it('Should be able to successfully get a program by id', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        `${endpoint}/1`,
      );

      expect(status).toBe(200);

      expect(body).toHaveProperty('id');
      expect(typeof body.id).toBe('number');
    });
  });

  describe('Error', () => {
    it('Should throw an error when the program is not found', async () => {
      const { body, status } = await request(app.getHttpServer()).get(
        `${endpoint}/999`,
      );

      expect(status).toBe(404);
      expect(body.message).toBe('Program not found');
    });
  });
});
