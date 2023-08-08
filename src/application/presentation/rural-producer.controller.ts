import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  RURAL_PRODUCER_SERVICE,
  RuralProducerServiceDomain,
} from '@/domain/services/rural-producer-service.domain';
import { RuralProducerDtoPayloadDomain } from '@/domain/dtos/rural-producer-dto-payload.domain';

@Controller('rural-producer')
export class RuralProducerController {
  constructor(
    @Inject(RURAL_PRODUCER_SERVICE)
    readonly ruralProducerService: RuralProducerServiceDomain,
  ) {}
  @Post()
  create(@Body() body: RuralProducerDtoPayloadDomain) {
    return this.ruralProducerService.createAndSave(body);
  }
  @Get()
  getAll() {
    return this.ruralProducerService.getAllRuralProducers();
  }

  @Put(':id')
  updateById(
    @Param('id') id: number,
    @Body() data: Partial<RuralProducerDtoPayloadDomain>,
  ) {
    return this.ruralProducerService.updateById(id, data);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.ruralProducerService.deleteById(id);
  }
}
