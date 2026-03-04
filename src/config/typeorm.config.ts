import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { Program } from 'src/shared/entity/program.entity';

export const typeorm_config: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  entities: [Program],
};
