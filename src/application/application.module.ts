import { Module } from '@nestjs/common';
import { FactoriesModule } from '../infra/factories/factories.module';
import { RuralProducerController } from './presentation/rural-producer.controller';

@Module({
  imports: [FactoriesModule],
  controllers: [RuralProducerController],
})
export class ApplicationModule {}
