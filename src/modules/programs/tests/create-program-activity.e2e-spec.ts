import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';
import { CreateProgramActivityRequest } from '../dto/create-program-activity.dto';
import { EnumDayOfWeek } from '@shared/entity/activity.entity';

const baseEndpoint = '/programs';

describe(`[POST] ${baseEndpoint} - Create activity for program`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully create a program activity', async () => {
      const endpoint = `${baseEndpoint}/1/activities`;
      const payload: CreateProgramActivityRequest = {
        title: 'Nova Sessão',
        day_of_week: EnumDayOfWeek.MONDAY,
        duration_minutes: 30,
        description: 'Descrição da atividade',
      };

      const { body, status } = await request(app.getHttpServer())
        .post(endpoint)
        .send(payload);

      expect(status).toBe(201);

      expect(body).toHaveProperty('id');
      expect(body.title).toBe(payload.title);
      expect(body.day_of_week).toBe(payload.day_of_week);
      expect(body.duration_minutes).toBe(payload.duration_minutes);
    });
  });

  describe('Error', () => {
    it('Should throw an error when the program is not found', async () => {
      const endpoint = `${baseEndpoint}/999/activities`;
      const payload: CreateProgramActivityRequest = {
        title: 'Nova Sessão',
        day_of_week: EnumDayOfWeek.MONDAY,
        duration_minutes: 30,
        description: 'Descrição da atividade',
      };

      const { body, status } = await request(app.getHttpServer())
        .post(endpoint)
        .send(payload);

      expect(status).toBe(404);
      expect(body.message).toBe('Program not found');
    });
  });
});
