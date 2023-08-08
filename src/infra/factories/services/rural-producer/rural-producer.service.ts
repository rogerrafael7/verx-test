import {
  RuralProducerServiceDomain,
  StatsResult,
} from '@/domain/services/rural-producer-service.domain';
import {
  PayloadCreateRuralProducer,
  RuralProducerRepoDomain,
} from '@/domain/repos/rural-producer-repo.domain';
import { RuralProducerModelDomain } from '@/domain/models/rural-producer-model.domain';
import {
  CustomException,
  CustomExceptionCode,
} from '@/infra/common/exceptions/custom.exception';

export class RuralProducerService implements RuralProducerServiceDomain {
  constructor(readonly ruralProducerRepo: RuralProducerRepoDomain) {}
  async createAndSave(
    payload: PayloadCreateRuralProducer,
  ): Promise<RuralProducerModelDomain> {
    this.validateArea(
      payload.totalAreaHa,
      payload.arableAreaHa,
      payload.vegetationAreaHa,
    );
    return this.ruralProducerRepo.createAndSave(payload);
  }

  getAllRuralProducers(): Promise<RuralProducerModelDomain[]> {
    return this.ruralProducerRepo.getAll();
  }

  deleteById(id: number): Promise<void> {
    return this.ruralProducerRepo.deleteById(id);
  }

  async updateById(
    id: number,
    payload: Partial<PayloadCreateRuralProducer>,
  ): Promise<RuralProducerModelDomain> {
    const ruralProducer = await this.ruralProducerRepo.getById(id);
    if (!ruralProducer) {
      throw new CustomException(
        'RuralProducer not found',
        CustomExceptionCode.NOT_FOUND,
      );
    }
    if (
      payload.arableAreaHa ||
      payload.vegetationAreaHa ||
      payload.totalAreaHa
    ) {
      this.validateArea(
        payload.totalAreaHa || ruralProducer.totalAreaHa,
        payload.arableAreaHa || ruralProducer.arableAreaHa,
        payload.vegetationAreaHa || ruralProducer.vegetationAreaHa,
      );
    }
    return this.ruralProducerRepo.updateById(id, payload);
  }

  getStats(): Promise<StatsResult> {
    return this.ruralProducerRepo.getStats();
  }

  private validateArea(
    totalAreaHa: number,
    arableAreaHa: number,
    vegetationAreaHa: number,
  ) {
    if (totalAreaHa < arableAreaHa + vegetationAreaHa) {
      throw new CustomException(
        `The sum arableAreaHa and vegetationAreaHa must be less than totalAreaHa: ${totalAreaHa}`,
        CustomExceptionCode.INVALID_PARAM,
      );
    }
  }
}
