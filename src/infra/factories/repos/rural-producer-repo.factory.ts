import { createFactory } from '@/infra/factories/create-factory';
import {
  RURAL_PRODUCER_REPO,
  RuralProducerRepoDomain,
} from '@/domain/repos/rural-producer-repo.domain';
import { RuralProducerRepo } from '@/infra/database-typeorm/repos/rural-producer.repo';

export const ruralProducerRepoFactory = createFactory<RuralProducerRepoDomain>({
  provide: RURAL_PRODUCER_REPO,
  inject: [RuralProducerRepo],
  useFactory: (repo: RuralProducerRepo) => repo,
});
