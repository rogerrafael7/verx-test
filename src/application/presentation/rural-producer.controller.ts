import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  RURAL_PRODUCER_SERVICE,
  RuralProducerServiceDomain,
} from '../../domain/services/rural-producer-service.domain';
import { RuralProducerDtoPayloadDomain } from '../../domain/dtos/rural-producer-dto-payload.domain';

@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    @Inject(RURAL_PRODUCER_SERVICE)
    readonly ruralProducerService: RuralProducerServiceDomain,
  ) {}
  @Post()
  create(@Body() body: RuralProducerDtoPayloadDomain) {
    return this.ruralProducerService.createRuralProducer(body);
  }
  @Get()
  getAll() {
    return this.ruralProducerService.getAllRuralProducers();
  }
}
