import { config } from 'dotenv';
import * as process from 'process';
config();

export const envs = {
  get PORT(): number {
    return +process.env.PORT;
  },
  get NODE_ENV(): string {
    return process.env.NODE_ENV;
  },
  get DATABASE_USER() {
    return process.env.DATABASE_USER;
  },
  get DATABASE_NAME() {
    return process.env.DATABASE_NAME;
  },
  get DATABASE_HOST() {
    return process.env.DATABASE_HOST;
  },
  get DATABASE_PORT() {
    return process.env.DATABASE_PORT;
  },
  get DATABASE_PASSWORD() {
    return process.env.DATABASE_PASSWORD;
  },
};
