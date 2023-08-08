import {
  PayloadCreateRuralProducer,
  RuralProducerRepoDomain,
} from '@/domain/repos/rural-producer-repo.domain';
import { RuralProducerModelDomain } from '@/domain/models/rural-producer-model.domain';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TYPEORM_DATASOURCE } from '@/infra/database-typeorm/datasource-typeorm.factory';
import { RuralProducerEntity } from '@/infra/database-typeorm/entities/rural-producer.entity';
import { RuralProducerPlantationTypeEntity } from '@/infra/database-typeorm/entities/rural-producer-plantation-type.entity';

@Injectable()
export class RuralProducerRepo implements RuralProducerRepoDomain {
  readonly ruralProducerRepo: Repository<RuralProducerEntity>;
  readonly ruralProducerPlantationTypeRepo: Repository<RuralProducerPlantationTypeEntity>;
  constructor(
    @Inject(TYPEORM_DATASOURCE)
    readonly datasource: DataSource,
  ) {
    this.ruralProducerRepo = datasource.getRepository(RuralProducerEntity);
    this.ruralProducerPlantationTypeRepo = datasource.getRepository(
      RuralProducerPlantationTypeEntity,
    );
  }

  createAndSave(data): Promise<RuralProducerModelDomain> {
    return this.datasource.transaction(async (manager) => {
      const ruralProducer = await manager.save(
        await manager.create(RuralProducerEntity, data),
      );
      if (data.plantationTypes?.length) {
        const ruralProducerPlantationTypes = [];
        for (const plantationType of data.plantationTypes) {
          ruralProducerPlantationTypes.push(
            await manager.save(
              manager.create(RuralProducerPlantationTypeEntity, {
                ruralProducerId: ruralProducer.id,
                plantationTypeId: plantationType,
              }),
            ),
          );
        }
        ruralProducer.ruralProducerPlantationTypes =
          ruralProducerPlantationTypes;
      }
      return ruralProducer;
    });
  }

  async updateById(
    id: number,
    data: Partial<PayloadCreateRuralProducer>,
  ): Promise<RuralProducerModelDomain> {
    return this.datasource.transaction(async (manager) => {
      const payload = {
        ...data,
        plantationTypes: undefined,
      };
      await manager
        .createQueryBuilder(RuralProducerEntity, 'rural_producer')
        .update()
        .set(payload)
        .where('id = :id', { id })
        .returning('*')
        .execute();

      const ruralProducerUpdated = await manager.findOne(RuralProducerEntity, {
        where: {
          id,
        },
      });

      if (Array.isArray(data.plantationTypes)) {
        await manager
          .createQueryBuilder(
            RuralProducerPlantationTypeEntity,
            'rural_producer_plantation_type',
          )
          .delete()
          .where('rural_producer_id = :id', { id })
          .execute();

        const ruralProducerPlantationTypes = [];
        for (const plantationType of data.plantationTypes) {
          ruralProducerPlantationTypes.push(
            await manager.save(
              RuralProducerPlantationTypeEntity,
              this.ruralProducerPlantationTypeRepo.create({
                ruralProducerId: ruralProducerUpdated.id,
                plantationTypeId: plantationType,
              }),
            ),
          );
        }
        ruralProducerUpdated.ruralProducerPlantationTypes =
          ruralProducerPlantationTypes;
      }
      return ruralProducerUpdated;
    });
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
