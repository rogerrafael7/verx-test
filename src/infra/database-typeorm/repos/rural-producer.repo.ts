import {
  PayloadCreateRuralProducer,
  RuralProducerRepoDomain,
} from '../../../domain/repos/rural-producer-repo.domain';
import { RuralProducerModelDomain } from '../../../domain/models/rural-producer-model.domain';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TYPEORM_DATASOURCE } from '../datasource-typeorm.factory';
import { RuralProducerEntity } from '../entities/rural-producer.entity';

@Injectable()
export class RuralProducerRepo implements RuralProducerRepoDomain {
  readonly ruralProducerRepo: Repository<RuralProducerEntity>;
  constructor(
    @Inject(TYPEORM_DATASOURCE)
    datasource: DataSource,
  ) {
    this.ruralProducerRepo = datasource.getRepository(RuralProducerEntity);
  }

  create<C = PayloadCreateRuralProducer>(
    data: C,
  ): Promise<RuralProducerModelDomain> {
    return this.ruralProducerRepo.save(this.ruralProducerRepo.create(data));
  }

  async updateById<P = PayloadCreateRuralProducer>(
    id: number,
    data: Partial<P>,
  ): Promise<RuralProducerModelDomain> {
    const row = await this.ruralProducerRepo
      .createQueryBuilder('rural_producer')
      .update()
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute();
    return row.raw[0];
  }

  async deleteById(id: number): Promise<void> {
    await this.ruralProducerRepo
      .createQueryBuilder('rural_producer')
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  getAll(): Promise<RuralProducerModelDomain[]> {
    return this.ruralProducerRepo.find();
  }

  getById(id: number): Promise<RuralProducerModelDomain> {
    return this.ruralProducerRepo.findOne({
      where: {
        id,
      },
    });
  }
}
