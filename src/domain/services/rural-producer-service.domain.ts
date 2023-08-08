import { RuralProducerModelDomain } from '@/domain/models/rural-producer-model.domain';
import { PayloadCreateRuralProducer } from '@/domain/repos/rural-producer-repo.domain';

export const RURAL_PRODUCER_SERVICE = Symbol('RURAL_PRODUCER_SERVICE');

export interface RuralProducerServiceDomain {
  createAndSave(
    ruralProducer: PayloadCreateRuralProducer,
  ): Promise<RuralProducerModelDomain>;
  updateById(
    id: number,
    data: Partial<PayloadCreateRuralProducer>,
  ): Promise<RuralProducerModelDomain>;
  deleteById(id: number): Promise<void>;
  getAllRuralProducers(): Promise<RuralProducerModelDomain[]>;
}
