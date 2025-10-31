import ValidatorInterface from '@/@shared/domain/validator/validator.interface';
import { SupplierEntity } from '../supplier.entity';
import Joi from 'joi';
import {
  DomainError,
  DomainErrorProps,
} from '@/@shared/domain/error/domain.error';

export class SupplierValidator implements ValidatorInterface<SupplierEntity> {
  validate(entity: SupplierEntity): void {
    const schema = this.getSchema();

    const validate = {
      id: entity.id,
      name: entity.name,
      contactEmail: entity.contactEmail,
      phoneNumber: entity.phoneNumber,
      cnpj: entity.cnpj,
      website: entity.website,
    };

    const { error } = schema.validate(validate, { abortEarly: false });

    if (error) {
      throw new DomainError(
        error.details.map((detail) => {
          const domainErrors: DomainErrorProps = {
            context: 'supplier',
            message: detail.message,
          };
          return domainErrors;
        }),
      );
    }
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      id: Joi.string().required().messages({
        'any.required': 'Id is required',
        'string.base': 'Id must be a string',
      }),
      name: Joi.string().trim().min(2).required().messages({
        'any.required': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.base': 'Name must be a string',
      }),
      contactEmail: Joi.string().allow('', null).email().optional().messages({
        'string.email': 'Email must be a valid address',
        'string.base': 'Email must be a string',
      }),
      phoneNumber: Joi.string().allow('', null).optional().messages({
        'string.base': 'Phone number must be a string',
      }),
      cnpj: Joi.string().optional().allow('', null).messages({
        'string.base': 'CNPJ must be a string',
      }),

      website: Joi.string().optional().allow('', null).messages({
        'string.base': 'Website must be a string',
      }),
    });
  }
}
