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
import { StatsResult } from '@/domain/services/rural-producer-service.domain';

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

  async getStats(): Promise<StatsResult> {
    const rows = await this.datasource.query(`
        WITH
            all_them AS (
                SELECT f.id,
                       f.state,
                       f.total_area_ha,
                       f.arable_area_ha,
                       f.vegetation_area_ha
                FROM tb_rural_producer f
            ),
            agg_state AS (
                SELECT
                    json_agg(
                            json_build_object(
                                    'state', f.state,
                                    'countFarms', f.count_farms,
                                    'sumTotalArea', f.sum_total_area,
                                    'sumArableArea', f.sum_arable_area,
                                    'sumVegetableArea', f.sum_vegetable_area
                                )
                        ) as "statsByState"
                FROM (SELECT f.state,
                             sum(1) as count_farms,
                             sum(f.total_area_ha) as sum_total_area,
                             sum(f.arable_area_ha) as sum_arable_area,
                             sum(f.vegetation_area_ha) as sum_vegetable_area from all_them f
                      GROUP BY f.state ORDER BY f.state) f
            ),
            agg_plantation_type AS (
                SELECT json_agg(
                               json_build_object(
                                       'plantationTypeName', f.plantation_type_name,
                                       'countFarms', f.count_farms,
                                       'sumTotalArea', f.sum_total_area,
                                       'sumArableArea', f.sum_arable_area,
                                       'sumVegetableArea', f.sum_vegetable_area
                                   )
                           ) as "statsByPlantationType"
                FROM (SELECT DISTINCT pt.name as plantation_type_name,
                                      sum(1) as count_farms,
                                      sum(f.total_area_ha) as sum_total_area,
                                      sum(f.arable_area_ha) as sum_arable_area,
                                      sum(f.vegetation_area_ha) as sum_vegetable_area
                      FROM all_them f
                               INNER JOIN ta_rural_producer_plantation_type rppt ON rppt.rural_producer_id = f.id
                               INNER JOIN td_plantation_type pt ON pt.id = rppt.plantation_type_id
                      GROUP BY pt.name ORDER BY pt.name) AS f
            ),
            agg_total AS (
                SELECT sum(1)                 as "totalCountFarms",
                       sum(f.total_area_ha)     as "sumTotalArea",
                       sum(f.arable_area_ha)    as "sumArableArea",
                       sum(f.vegetation_area_ha) as "sumVegetableArea"
                FROM all_them f
            )
        SELECT agg_total.*, agg_state.*, agg_plantation_type.* from agg_total, agg_state, agg_plantation_type;
    `);

    return {
      totalCountFarms: +rows[0]?.totalCountFarms || 0,
      sumTotalArea: +rows[0]?.sumTotalArea || 0,
      sumArableArea: +rows[0]?.sumArableArea || 0,
      sumVegetableArea: +rows[0]?.sumVegetableArea || 0,
      statsByState: rows[0]?.statsByState || 0,
      statsByPlantationType: rows[0]?.statsByPlantationType || 0,
    };
  }
}
