import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { Program } from '@shared/entity/program.entity';
import { Activity } from '@shared/entity/activity.entity';
import { Participation } from '@shared/entity/participation.entity';

export const typeorm_config: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'namu_wellness',
  logging: false,
  entities: [Program, Activity, Participation],
};
