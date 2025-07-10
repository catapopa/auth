import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // Use DATABASE_URL for production (Railway), fall back to individual vars for local
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_URL
    ? undefined
    : process.env.DB_HOST || 'localhost',
  port: process.env.DATABASE_URL
    ? undefined
    : parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DATABASE_URL
    ? undefined
    : process.env.DB_USERNAME || 'postgres',
  password: process.env.DATABASE_URL
    ? undefined
    : process.env.DB_PASSWORD || 'postgres',
  database: process.env.DATABASE_URL
    ? undefined
    : process.env.DB_NAME || 'auth_db',
  entities: ['./src/modules/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
});
