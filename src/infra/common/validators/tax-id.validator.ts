import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'TaxIdValidator', async: false })
export class TaxIdValidator implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    if (validationArguments.value.length === 11) {
      return 'CPF is not valid';
    }
    if (validationArguments.value.length === 14) {
      return 'CNPJ is not valid';
    }
    return 'TaxId is not valid';
  }

  validate(value: any): Promise<boolean> | boolean {
    try {
      const taxId = String(value).replace(/\D/g, '');
      if (taxId.length === 11) {
        return this.validateCPF(taxId);
      } else if (taxId.length === 14) {
        return this.validateCNPJ(taxId);
      } else {
        return false;
      }
    } catch(error) {
      console.error(error.message)
      return false
    }
  }
  validateCPF(cpfValue: string): boolean {
    return cpf.isValid(cpfValue);
  }
  validateCNPJ(cnpjValue: string): boolean {
    return cnpj.isValid(cnpjValue);
  }
}
