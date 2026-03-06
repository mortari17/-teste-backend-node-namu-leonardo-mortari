import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

export async function getApp(): Promise<INestApplication> {
  const module_ref: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module_ref.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.init();

  return app;
}
