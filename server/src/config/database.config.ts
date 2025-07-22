import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  synchronize: process.env.DATABASE_SYNCHRONIZE || true,
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5433,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '195583',
  database: process.env.DATABASE_NAME || 'nestjs-test-app',
}));
