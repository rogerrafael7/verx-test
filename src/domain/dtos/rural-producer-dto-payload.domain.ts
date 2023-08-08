import { IsNumber, IsString, Validate } from 'class-validator';
import { TaxIdValidator } from '@/infra/common/validators/tax-id.validator';
import { PayloadCreateRuralProducer } from '@/domain/repos/rural-producer-repo.domain';

export class RuralProducerDtoPayloadDomain
  implements PayloadCreateRuralProducer
{
  @IsString()
  @Validate(TaxIdValidator)
  taxId: string;
  @IsString()
  name: string;
  @IsString()
  farmName: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsNumber()
  totalAreaHa: number;
  @IsNumber()
  arableAreaHa: number;
  @IsNumber()
  vegetationAreaHa: number;

  @IsNumber(
    {},
    { each: true, message: 'plantationTypeIds must be a IDs list' },
  )
  plantationTypes: number[];
}
