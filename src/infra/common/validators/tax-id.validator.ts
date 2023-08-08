import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

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
    const taxId = value;
    if (taxId.length === 11) {
      return this.validateCPF(taxId);
    } else if (taxId.length === 14) {
      return this.validateCNPJ(taxId);
    } else {
      return false;
    }
  }
  validateCPF(cpfValue: string): boolean {
    return cpf.isValid(cpfValue);
  }
  validateCNPJ(cnpjValue: string): boolean {
    return cnpj.isValid(cnpjValue);
  }
}
