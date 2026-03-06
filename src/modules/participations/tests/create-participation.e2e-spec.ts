import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getApp } from '../../../../test/testing-module';
import { CreateParticipationRequest } from '../dto/create-participation.dto';

const endpoint = '/participations';

describe(`[POST] ${endpoint} - Create participation`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Success', () => {
    it('Should be able to successfully create a participation', async () => {
      const payload: CreateParticipationRequest = {
        user_name: 'João Silva',
        activity_id: 1,
        notes: 'Participação bem-sucedida',
      };

      const { body, status } = await request(app.getHttpServer())
        .post(endpoint)
        .send(payload);

      expect(status).toBe(201);

      expect(body).toHaveProperty('id');
      expect(body.user_name).toBe(payload.user_name);
      expect(body.activity_id).toBe(payload.activity_id);
      expect(body.notes).toBe(payload.notes);
    });
  });

  describe('Error', () => {
    it('Should throw an error when activity is not found', async () => {
      const payload: CreateParticipationRequest = {
        user_name: 'Pedro Costa',
        activity_id: 999,
      };

      const { body, status } = await request(app.getHttpServer())
        .post(endpoint)
        .send(payload);

      expect(status).toBe(404);
      expect(body.message).toBe('Activity not found');
    });
  });
});
