import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment-specific configuration
const env = process.env.NODE_ENV || 'development';
const appEnv = process.env.APP_ENV || 'local';

const envFiles = [
  `.env.${appEnv}`,
  `.env`,
  `.env.${env}`
];

// Load env files in order of priority
envFiles.forEach(file => {
  const path = join(process.cwd(), '..', file);
  config({ path, override: false });
});

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
