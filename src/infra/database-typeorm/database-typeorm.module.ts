import { Module } from '@nestjs/common';
import { databaseProviders } from './datasource-typeorm.factory';
import { RuralProducerRepo } from './repos/rural-producer.repo';

@Module({
  providers: [databaseProviders, RuralProducerRepo],
  exports: [RuralProducerRepo],
})
export class DatabaseTypeormModule {}
