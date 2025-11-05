import ValidatorInterface from "@/@shared/domain/validator/validator.interface";
import { UserEntity } from "../domain/entities/user.entity";
import { UserValidator } from "../domain/validator/user.validator";

export class UserValidatorFactory {
  static create(): ValidatorInterface<UserEntity> {
    return new UserValidator();
  }
}