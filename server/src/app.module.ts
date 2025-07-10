import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/users.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
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
      entities: [User],
      migrations: ['dist/src/migrations/*.js'],
      migrationsRun: true, // Automatically run migrations on startup
      synchronize: false, // Disable synchronize when using migrations
      logging: true, // Enable logging to see what's happening
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
