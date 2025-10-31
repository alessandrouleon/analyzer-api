import Entity from '../../../@shared/domain/entity/entity.abstract';
import { DomainError } from '../../../@shared/domain/error/domain.error';
import ValidatorInterface from '../../../@shared/domain/validator/validator.interface';
import { SupplierValidatorFactory } from '../factory/supplier.validator.factory';

export type SupplierProps = {
  name: string;
  cnpj?: string;
  website?: string;
  contactEmail?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface SupplierToJson {
  id: string;
  name: string;
  cnpj?: string;
  website?: string;
  contactEmail?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SupplierEntity extends Entity<SupplierEntity> {
  private _name: string;
  private _contactEmail?: string;
  private _phoneNumber?: string;
  private _cnpj?: string;
  private _website?: string;

  validator: ValidatorInterface<SupplierEntity>;

  constructor(id: string, props: SupplierProps) {
    super(
      id,
      SupplierValidatorFactory.create(),
      props.createdAt,
      props.updatedAt,
    );

    this._name = props.name;
    this._contactEmail = props.contactEmail;
    this._phoneNumber = props.phoneNumber;
    this._cnpj = props.cnpj;
    this._website = props.website;

    this.validator = SupplierValidatorFactory.create();
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (!newName || newName.trim().length === 0) {
      throw new DomainError([
        { context: 'supplier', message: 'Name cannot be empty' },
      ]);
    }

    this._name = newName.trim();
    this.validate();
  }

  get contactEmail(): string {
    return this._contactEmail;
  }

  set contactEmail(email: string) {
    this._contactEmail = email?.trim();
    this.validate();
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(phone: string) {
    this._phoneNumber = phone?.trim();
    this.validate();
  }

  get cnpj() {
    return this._cnpj;
  }

  set cnpj(cnpj: string) {
    this._cnpj = cnpj?.trim();
    this.validate();
  }

  get website() {
    return this._website;
  }

  set website(website: string) {
    this._website = website?.trim();
    this.validate();
  }

  toJSON(): SupplierToJson {
    return {
      id: this.id,
      name: this.name,
      cnpj: this.cnpj,
      website: this.website,
      contactEmail: this.contactEmail,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
