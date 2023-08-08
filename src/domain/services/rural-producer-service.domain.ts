import { RuralProducerModelDomain } from '../models/rural-producer-model.domain';
import { PayloadCreateRuralProducer } from '../repos/rural-producer-repo.domain';

export const RURAL_PRODUCER_SERVICE = Symbol('RURAL_PRODUCER_SERVICE');

export interface RuralProducerServiceDomain {
  createRuralProducer(
    ruralProducer: PayloadCreateRuralProducer,
  ): Promise<RuralProducerModelDomain>;
  getAllRuralProducers(): Promise<RuralProducerModelDomain[]>;
}
