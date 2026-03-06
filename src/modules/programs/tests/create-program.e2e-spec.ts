import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';
import { CreateProgramRequest } from '../dto/create-program.dto';
import { EnumProgramCategory } from '@shared/entity/program.entity';

const endpoint = '/programs';

describe(`[POST] ${endpoint} - Create program`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully create a program', async () => {
      const payload: CreateProgramRequest = {
        name: 'Novo Programa',
        description: 'Descrição do programa',
        category: EnumProgramCategory.EXERCISE,
        duration_weeks: 8,
      };

      const { body, status } = await request(app.getHttpServer())
        .post(endpoint)
        .send(payload);

      expect(status).toBe(201);

      expect(body).toHaveProperty('id');
      expect(body.name).toBe(payload.name);
      expect(body.description).toBe(payload.description);
      expect(body.category).toBe(payload.category);
      expect(body.duration_weeks).toBe(payload.duration_weeks);
    });
  });
});
