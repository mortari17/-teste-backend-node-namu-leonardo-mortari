import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';

const endpoint = '/programs';

describe(`[DELETE] ${endpoint}/:id - Delete program`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('Success', () => {
    it('Should be able to successfully delete a program', async () => {
      const { status } = await request(app.getHttpServer()).delete(
        `${endpoint}/3`,
      );

      expect(status).toBe(200);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the program is not found', async () => {
      const { body, status } = await request(app.getHttpServer()).delete(
        `${endpoint}/999`,
      );

      expect(status).toBe(404);
      expect(body.message).toBe('Program not found');
    });
  });
});
