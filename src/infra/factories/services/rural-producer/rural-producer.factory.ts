import { createFactory } from '@/infra/factories/create-factory';
import {
  RURAL_PRODUCER_SERVICE,
  RuralProducerServiceDomain,
} from '@/domain/services/rural-producer-service.domain';
import { RuralProducerService } from './rural-producer.service';
import {
  RURAL_PRODUCER_REPO,
  RuralProducerRepoDomain,
} from '@/domain/repos/rural-producer-repo.domain';

export const ruralProducerServiceFactory =
  createFactory<RuralProducerServiceDomain>({
    provide: RURAL_PRODUCER_SERVICE,
    inject: [RURAL_PRODUCER_REPO],
    useFactory: (ruralRepo: RuralProducerRepoDomain) => {
      return new RuralProducerService(ruralRepo);
    },
  });
