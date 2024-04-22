import 'reflect-metadata';

import path from 'node:path';
import process from 'node:process';

import { config } from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from './snake-naming.strategy';

const env = process.env.NODE_ENV;
const envPath: string = path.join(__dirname, '..', '..', '..', `.env.${env}`);

config({ path: envPath });

const entities = [
  path.join(__dirname, '..', '..', 'modules/**/*.entity{.ts,.js}'),
  path.join(__dirname, '..', '..', 'modules/**/*.view-entity{.ts,.js}'),
];
const migrations = [path.join(__dirname, 'migrations/*{.ts,.js}')];

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities,
  migrations,
  subscribers: [],
} as DataSourceOptions);
