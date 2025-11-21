import { UserEntity } from "@/modules/users/domain/entities/user.entity";
import { PASSWORD_INVALID_MESSAGE, PASSWORD_REGEX } from "@/modules/users/domain/value-objects/password.vo";
import { ROLES } from "@/shared/constants/user.roles";
import { DomainError, DomainErrorProps } from "@/shared/domain/error/domain.error";
import ValidatorInterface from "@/shared/domain/validator/validator.interface";
import Joi from "joi";


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


    const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });

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
        'string.empty': 'Id cannot be empty',
      }),

      name: Joi.string().trim().min(2).max(100).required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'string.base': 'Name must be a string',
      }),

      username: Joi.string().trim().min(2).max(50).required().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 2 characters',
        'string.max': 'Username cannot exceed 50 characters',
        'string.base': 'Username must be a string',
      }),

      email: Joi.string().trim().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid address',
        'string.base': 'Email must be a string',
      }),

      password: Joi.string()
        .trim()
        .min(8)
        .max(80)
        .pattern(PASSWORD_REGEX)
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.empty': 'Password cannot be empty',
          'string.min': 'Password must be at least 8 characters',
          'string.max': 'Password must be at most 80 characters',
          'string.base': 'Password must be a string',
          'string.pattern.base': PASSWORD_INVALID_MESSAGE,
        }),

      role: Joi.string().valid(ROLES.ADMIN, ROLES.USER).required().messages({
        'any.required': 'Role is required',
        'string.empty': 'Role cannot be empty',
        'any.only': 'Role must be ADMIN or USER',
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