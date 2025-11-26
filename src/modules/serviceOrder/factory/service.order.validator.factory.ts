import ValidatorInterface from "@/@shared/domain/validator/validator.interface";
import { ServiceOrderEntity } from "../domain/entities/service.order.entity";
import { ServiceOrderValidator } from "../domain/validator/service.order.validator";

export class ServiceOrderValidatorFactory {
  static create(): ValidatorInterface<ServiceOrderEntity> {
    return new ServiceOrderValidator();
  }
}