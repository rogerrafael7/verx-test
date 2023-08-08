import { BaseRepoDomain } from './base-repo.domain';
import { RuralProducerModelDomain } from '../models/rural-producer-model.domain';

export const RURAL_PRODUCER_REPO = Symbol('RURAL_PRODUCER_REPO');

export type PayloadCreateRuralProducer = Omit<
  RuralProducerModelDomain,
  'id' | 'plantationTypes'
> & {
  plantationTypes: number[];
};

export interface RuralProducerRepoDomain
  extends BaseRepoDomain<RuralProducerModelDomain> {
  create<C = PayloadCreateRuralProducer>(
    data: C,
  ): Promise<RuralProducerModelDomain>;
  updateById<P = PayloadCreateRuralProducer>(
    id: number,
    data: Partial<P>,
  ): Promise<RuralProducerModelDomain>;
}
