import { DomainError, DomainErrorProps } from "@/@shared/domain/error/domain.error";
import ValidatorInterface from "@/@shared/domain/validator/validator.interface";
import Joi from "joi";
import { ServiceOrderEntity } from "../entities/service.order.entity";


export class ServiceOrderValidator implements ValidatorInterface<ServiceOrderEntity> {
  validate(entity: ServiceOrderEntity): void {
    const schema = this.getSchema();


    const data = {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      service_order_number: entity.service_order_number,
      issue_date: entity.issue_date,
      expected_delivery_date: entity.expected_delivery_date,
      status: entity.status,
      priority: entity.priority,
      common_defects: entity.common_defects,
      accessories: entity.accessories,
      physical_condition: entity.physical_condition,
      tests_performed: entity.tests_performed,
      image_url: entity.image_url,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };


    const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });

    if (error) {
      throw new DomainError(
        error.details.map((detail) => {
          const domainErrors: DomainErrorProps = {
            context: 'serviceOrder',
            message: detail.message,
          };
          return domainErrors;
        }),
      )
    }
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      id: Joi.string().required().messages({
        'any.required': 'Id is required',
        'string.base': 'Id must be a string',
        'string.empty': 'Id cannot be empty',
      }),

      name: Joi.string().trim().min(2).max(100).required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'string.base': 'Name must be a string',
      }),

      description: Joi.string().trim().min(2).max(100).required().messages({
        'any.required': 'Description is required',
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 2 characters',
        'string.max': 'Description cannot exceed 100 characters',
        'string.base': 'Description must be a string',
      }),

      service_order_number: Joi.string().trim().min(2).max(50).required().messages({
        'any.required': 'Service order number is required',
        'string.empty': 'Service order number cannot be empty',
        'string.min': 'Service order number must be at least 2 characters',
        'string.max': 'Service order number cannot exceed 50 characters',
        'string.base': 'Service order number must be a string',
      }),

      issue_date: Joi.date().required().messages({
        'any.required': 'Issue date is required',
        'date.base': 'Issue date must be a valid date',
      }),

      expected_delivery_date: Joi.date().required().messages({
        'any.required': 'Expected delivery date is required',
        'date.base': 'Expected delivery date must be a valid date',
      }),

      status: Joi.string().trim().required().messages({
        'any.required': 'Status is required',
        'string.empty': 'Status cannot be empty',
        'string.base': 'Status must be a string',
      }),

      priority: Joi.string().trim().required().messages({
        'any.required': 'Priority is required',
        'string.empty': 'Priority cannot be empty',
        'string.base': 'Priority must be a string',
      }),

      common_defects: Joi.array().items(Joi.string().trim()).required().messages({
        'any.required': 'Common defects is required',
        'array.base': 'Common defects must be an array of strings',
      }),

      accessories: Joi.array().items(Joi.string().trim()).required().messages({
        'any.required': 'Accessories is required',
        'array.base': 'Accessories must be an array of strings',
      }),

      physical_condition: Joi.array().items(Joi.string().trim()).required().messages({
        'any.required': 'Physical condition is required',
        'array.base': 'Physical condition must be an array of strings',
      }),

      tests_performed: Joi.array().items(Joi.string().trim()).required().messages({
        'any.required': 'Tests performed is required',
        'array.base': 'Tests performed must be an array of strings',
      }),

      image_url: Joi.string().messages({
        'string.empty': 'Image cannot be empty',
      }),

      createdAt: Joi.date().required().messages({
        'any.required': 'CreatedAt is required',
      }),
      updatedAt: Joi.date().required().messages({
        'any.required': 'UpdatedAt is required',
      }),

    });

  }
}