import { IsNumber, IsString, Validate } from 'class-validator';
import { TaxIdValidator } from '../../infra/common/validators/tax-id.validator';
import { PayloadCreateRuralProducer } from '../repos/rural-producer-repo.domain';

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
  @IsString()
  totalAreaHa: number;
  @IsString()
  arableAreaHa: number;
  @IsString()
  vegetationAreaHa: number;

  @IsNumber(
    {},
    { each: true, message: 'plantationTypeIds must be a number array' },
  )
  plantationTypes: number[];
}
