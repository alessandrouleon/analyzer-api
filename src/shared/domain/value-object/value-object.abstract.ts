import ValidatorInterface from '../validator/validator.interface';
export default abstract class ValueObject<T> {
  private self: any;

  constructor(public readonly validator: ValidatorInterface<T>) {
    this.self = this;
  }

  validate() {
    this.validator.validate(this.self);
  }
}
