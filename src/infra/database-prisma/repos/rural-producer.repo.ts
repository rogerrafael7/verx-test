import {
  PayloadCreateRuralProducer,
  RuralProducerRepoDomain,
} from '../../../domain/repos/rural-producer-repo.domain';
import { PrismaService } from '../prisma-client';
import { RuralProducerModelDomain } from '../../../domain/models/rural-producer-model.domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RuralProducerRepo implements RuralProducerRepoDomain {
  constructor(readonly prismaService: PrismaService) {}
  async create(data): Promise<RuralProducerModelDomain> {
    return this.prismaService.$transaction(async (tx) => {
      const plantationTypesIds = data.plantationTypes;
      const ruralProducer = await tx.ruralProducer.create({
        data: this.preparePayloadToCreate(data),
      });

      const plantationTypes = await tx.plantationType.findMany({
        where: {
          id: {
            in: plantationTypesIds,
          },
        },
      });

      await tx.plantationType.createMany({
        data: plantationTypes.map((plantationType) => ({
          ...plantationType,
          ruralProducerId: ruralProducer.id,
        })),
      });
      return {
        ...ruralProducer,
        plantationTypes: plantationTypes.map((plantationType) => ({
          id: plantationType.id,
          name: plantationType.name,
        })),
      };
    });
  }

  getAll(): Promise<RuralProducerModelDomain[]> {
    return this.prismaService.ruralProducer.findMany();
  }

  getById(id: number): Promise<RuralProducerModelDomain> {
    return this.prismaService.ruralProducer.findUnique({
      where: {
        id,
      },
    });
  }

  async updateById(id: number, data): Promise<RuralProducerModelDomain> {
    return this.prismaService.ruralProducer.update({
      where: {
        id,
      },
      data: this.preparePayloadToCreate(data),
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.ruralProducer.delete({
      where: {
        id,
      },
    });
  }

  private preparePayloadToCreate(
    data: Partial<PayloadCreateRuralProducer>,
  ): Prisma.RuralProducerCreateInput {
    return {
      arableAreaHa: data.arableAreaHa,
      city: data.city,
      farmName: data.farmName,
      name: data.name,
      state: data.state,
      taxId: data.taxId,
      totalAreaHa: data.totalAreaHa,
      vegetationAreaHa: data.vegetationAreaHa,
    };
  }
}
