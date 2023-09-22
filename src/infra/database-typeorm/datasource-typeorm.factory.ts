import { DataSource } from 'typeorm';
import { envs } from '@/envs';
import { createFactory } from '@/infra/factories/create-factory';

export const TYPEORM_DATASOURCE = Symbol('TYPEORM_DATASOURCE');

export const databaseProviders = createFactory<Promise<DataSource>>({
  provide: TYPEORM_DATASOURCE,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: envs.DATABASE_HOST,
      port: +envs.DATABASE_PORT,
      username: envs.DATABASE_USER,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_NAME,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
    });

    return dataSource.initialize();
  },
});
