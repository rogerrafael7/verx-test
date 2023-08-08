import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-client';
import { RuralProducerRepo } from './repos/rural-producer.repo';

@Module({
  providers: [PrismaService, RuralProducerRepo],
  exports: [RuralProducerRepo],
})
export class DatabasePrismaModule {}
