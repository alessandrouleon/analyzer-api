import { UserEntity } from "@/modules/users/domain/entities/user.entity";
import { UserValidator } from "@/modules/users/domain/validator/user.validator";
import ValidatorInterface from "@/shared/domain/validator/validator.interface";

export class UserValidatorFactory {
  static create(): ValidatorInterface<UserEntity> {
    return new UserValidator();
  }
}