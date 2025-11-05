import { DomainError, DomainErrorProps } from "@/@shared/domain/error/domain.error";
import ValidatorInterface from "@/@shared/domain/validator/validator.interface";
import Joi from "joi";
import { UserEntity } from "../entities/user.entity";
import { PASSWORD_INVALID_MESSAGE, PASSWORD_REGEX } from "../value-objects/password.vo";

 enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class UserValidator implements ValidatorInterface<UserEntity> {
  validate(entity: UserEntity): void {
    const schema = this.getSchema();


   const data = {
          id: entity.id,
          name: entity.name,
          username: entity.username,
          email: entity.email,
          password: entity.password,
          role: entity.role,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
      };


    const {error} = schema.validate(data, {abortEarly: false, allowUnknown: true});

    if (error) {
      throw new DomainError(
        error.details.map((detail) => {
          const domainErrors: DomainErrorProps = {
            context: 'user',
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
    }),
    name: Joi.string().trim().min(2).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.base': 'Name must be a string',
    }),

    username: Joi.string().trim().min(2).required().messages({
      'any.required': 'Username is required',
      'string.min': 'Username must be at least 2 characters',
      'string.base': 'Username must be a string',
    }),

    email: Joi.string().trim().email().optional().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid address',
      'string.base': 'Email must be a string',
    }),

password: Joi.string()
        .trim()
        .min(2)
        .pattern(PASSWORD_REGEX)
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.min': 'Password must be at least 2 characters',
          'string.base': 'Password must be a string',
          'string.pattern.base': PASSWORD_INVALID_MESSAGE,
        }),


     role: Joi.string().valid(UserRole.ADMIN, UserRole.USER).required().messages({
      'any.required': 'Role is required',
      'any.only': 'Role must be either admin or user',
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