import { RuralProducerModelDomain } from '@/domain/models/rural-producer-model.domain';
import { PayloadCreateRuralProducer } from '@/domain/repos/rural-producer-repo.domain';

export const RURAL_PRODUCER_SERVICE = Symbol('RURAL_PRODUCER_SERVICE');

export interface StatsResult {
  totalCountFarms: number;
  sumTotalArea: number;
  sumArableArea: number;
  sumVegetableArea: number;

  statsByState: {
    state: string;
    countFarms: number;
    sumTotalArea: number;
    sumArableArea: number;
    sumVegetableArea: number;
  }[];

  statsByPlantationType: {
    plantationTypeName: string;
    countFarms: number;
    sumTotalArea: number;
    sumArableArea: number;
    sumVegetableArea: number;
  }[];
}

export interface RuralProducerServiceDomain {
  createAndSave(
    ruralProducer: PayloadCreateRuralProducer,
  ): Promise<RuralProducerModelDomain>;
  updateById(
    id: number,
    data: Partial<PayloadCreateRuralProducer>,
  ): Promise<RuralProducerModelDomain>;
  deleteById(id: number): Promise<void>;
  getStats(): Promise<StatsResult>;
  getAllRuralProducers(): Promise<RuralProducerModelDomain[]>;
}
