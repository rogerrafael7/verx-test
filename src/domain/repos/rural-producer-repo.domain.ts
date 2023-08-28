import { BaseRepoDomain } from '@/domain/repos/base-repo.domain';
import { RuralProducerModelDomain } from '@/domain/models/rural-producer-model.domain';
import { StatsResult } from '@/domain/services/rural-producer-service.domain';

export const RURAL_PRODUCER_REPO = Symbol('RURAL_PRODUCER_REPO');

export type PayloadCreateRuralProducer = Omit<
  RuralProducerModelDomain,
  'id' | 'plantationTypes'
> & {
  plantationTypes: number[];
};

export interface RuralProducerRepoDomain
  extends BaseRepoDomain<RuralProducerModelDomain> {
  getStats(): Promise<StatsResult>;
  createAndSave<C = PayloadCreateRuralProducer>(
    data: C,
  ): Promise<RuralProducerModelDomain>;
  updateById<P = PayloadCreateRuralProducer>(
    id: number,
    data: Partial<P>,
  ): Promise<RuralProducerModelDomain>;
}
