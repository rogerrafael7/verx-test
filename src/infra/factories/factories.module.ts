import { Module } from '@nestjs/common';
import { ruralProducerRepoFactory } from './repos/rural-producer-repo.factory';
import { ruralProducerServiceFactory } from './services/rural-producer/rural-producer.factory';
import { DatabaseTypeormModule } from '../database-typeorm/database-typeorm.module';

@Module({
  imports: [DatabaseTypeormModule],
  providers: [ruralProducerRepoFactory, ruralProducerServiceFactory],
  exports: [
    ruralProducerRepoFactory.provide,
    ruralProducerServiceFactory.provide,
  ],
})
export class FactoriesModule {}
