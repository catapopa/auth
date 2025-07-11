import { config } from 'dotenv';
import { join } from 'path';

export interface AppConfig {
  env: string;
  port: number;
  host: string;
  database: {
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    name?: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cors: {
    origins: string[];
  };
  client: {
    url: string;
  };
  logging: {
    level: string;
  };
}

export function loadConfig(): AppConfig {
  const env = process.env.NODE_ENV || 'development';
  const appEnv = process.env.APP_ENV || 'local';

  // Load environment-specific .env file
  const envFiles = [`.env.${appEnv}`, `.env`, `.env.${env}`];

  // Load env files in order of priority
  envFiles.forEach((file) => {
    const path = join(process.cwd(), file);
    config({ path, override: false });
  });

  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:4200'];

  // Add production URLs if they're not already included
  if (env === 'production') {
    const productionUrls = [
      'https://auth-web-production.up.railway.app',
      'https://auth-production-32b4.up.railway.app',
    ];

    productionUrls.forEach((url) => {
      if (!corsOrigins.includes(url)) {
        corsOrigins.push(url);
      }
    });
  }

  console.log('CORS origins loaded:', corsOrigins);

  return {
    env,
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
    database: {
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      name: process.env.DB_NAME || 'auth_db',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'fallback-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    cors: {
      origins: corsOrigins,
    },
    client: {
      url: process.env.CLIENT_URL || 'http://localhost:4200',
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info',
    },
  };
}
