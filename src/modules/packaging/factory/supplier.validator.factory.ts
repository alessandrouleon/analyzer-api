import ValidatorInterface from '@/@shared/domain/validator/validator.interface';
import { SupplierEntity } from '../domain/supplier.entity';
import { SupplierValidator } from '../domain/validator/supplier.validator';

export class SupplierValidatorFactory {
  static create(): ValidatorInterface<SupplierEntity> {
    return new SupplierValidator();
  }
}
