import { RuralProducerServiceDomain } from '@/domain/services/rural-producer-service.domain';
import {
  PayloadCreateRuralProducer,
  RuralProducerRepoDomain,
} from '@/domain/repos/rural-producer-repo.domain';
import { RuralProducerModelDomain } from '@/domain/models/rural-producer-model.domain';

export class RuralProducerService implements RuralProducerServiceDomain {
  constructor(readonly ruralProducerRepo: RuralProducerRepoDomain) {}
  async createAndSave(
    payload: PayloadCreateRuralProducer,
  ): Promise<RuralProducerModelDomain> {
    return this.ruralProducerRepo.createAndSave(payload);
  }

  getAllRuralProducers(): Promise<RuralProducerModelDomain[]> {
    return this.ruralProducerRepo.getAll();
  }

  deleteById(id: number): Promise<void> {
    return this.ruralProducerRepo.deleteById(id);
  }

  updateById(
    id: number,
    data: Partial<PayloadCreateRuralProducer>,
  ): Promise<RuralProducerModelDomain> {
    return this.ruralProducerRepo.updateById(id, data);
  }
}
