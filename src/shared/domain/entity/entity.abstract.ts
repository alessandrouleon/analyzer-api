import ValidatorInterface from '@/shared/domain/validator/validator.interface';

export default abstract class Entity<T> {
  private self: any;
  private _updatedAt: Date;
  public readonly notification: Notification;

  constructor(
    public readonly id: string,
    public readonly validator: ValidatorInterface<T>,
    public readonly createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (!createdAt) {
      this.createdAt = new Date();
      this._updatedAt = new Date();
    } else {
      this._updatedAt = updatedAt;
    }

    this.self = this;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  setUpdatedAt(value?: Date) {
    if (value) this._updatedAt = new Date(value);
    else this._updatedAt = new Date();
  }

  validate() {
    this.validator.validate(this.self);
  }
}
