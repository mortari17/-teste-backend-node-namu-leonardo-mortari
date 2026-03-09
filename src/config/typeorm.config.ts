import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { Program } from '@modules/programs/entities/program.entity';
import { Activity } from '@modules/activities/entities/activity.entity';
import { Participation } from '@modules/participations/entities/participation.entity';

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
