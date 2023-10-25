import 'reflect-metadata';

import {DataSource} from 'typeorm';

import * as Entity from './entity';

const en = [];

Object.entries(Entity).forEach(([_key, value]) => {
  en.push(value);
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: en,
  migrations: ['src/migration/**.ts'],
  subscribers: [],
});
