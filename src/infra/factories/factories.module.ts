import { Module } from '@nestjs/common';
import { ruralProducerRepoFactory } from '@/infra/factories/repos/rural-producer-repo.factory';
import { ruralProducerServiceFactory } from '@/infra/factories/services/rural-producer/rural-producer.factory';
import { DatabaseTypeormModule } from '@/infra/database-typeorm/database-typeorm.module';

@Module({
  imports: [DatabaseTypeormModule],
  providers: [ruralProducerRepoFactory, ruralProducerServiceFactory],
  exports: [
    ruralProducerRepoFactory.provide,
    ruralProducerServiceFactory.provide,
  ],
})
export class FactoriesModule {}
