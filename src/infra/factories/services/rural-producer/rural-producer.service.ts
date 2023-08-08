import { RuralProducerServiceDomain } from '../../../../domain/services/rural-producer-service.domain';
import {
  PayloadCreateRuralProducer,
  RuralProducerRepoDomain,
} from '../../../../domain/repos/rural-producer-repo.domain';
import { RuralProducerModelDomain } from '../../../../domain/models/rural-producer-model.domain';

export class RuralProducerService implements RuralProducerServiceDomain {
  constructor(readonly ruralProducerRepo: RuralProducerRepoDomain) {}
  createRuralProducer(
    ruralProducer: PayloadCreateRuralProducer,
  ): Promise<RuralProducerModelDomain> {
    return this.ruralProducerRepo.create(ruralProducer);
  }

  getAllRuralProducers(): Promise<RuralProducerModelDomain[]> {
    return this.ruralProducerRepo.getAll();
  }
}
