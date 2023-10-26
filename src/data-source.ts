import 'reflect-metadata';

import {DataSource} from 'typeorm';

import * as Entity from './entity';

type ValueOf<T> = T[keyof T];

const en: ValueOf<typeof Entity>[] = [];

Object.entries(Entity).forEach(([_key, value]) => {
  en.push(value);
});

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test.sqlite',
  synchronize: true,
  logging: false,
  entities: en,
  migrations: ['src/migration/**.ts'],
  subscribers: [],
});
