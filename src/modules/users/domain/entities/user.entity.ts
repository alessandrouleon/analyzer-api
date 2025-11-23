
import { ROLES } from "@/@shared/constants/user.roles";
import Entity from "@/@shared/domain/entity/entity.abstract";
import { DomainError } from "@/@shared/domain/error/domain.error";
import ValidatorInterface from "@/@shared/domain/validator/validator.interface";
import { UserValidatorFactory } from "@/modules/users/factory/user.validator.factory";



export type UserIterfaces = {
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: ROLES;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type UserToJSON = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: ROLES;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
export class UserEntity extends Entity<UserEntity> {
  private _name: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _role: ROLES;

  validator: ValidatorInterface<UserEntity>;

  constructor(
    private readonly props: UserIterfaces
  ) {
    super(props.id, UserValidatorFactory.create(), props.createdAt, props.updatedAt, props.deletedAt);

    this._name = props.name;
    this._username = props.username;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;

    this.validator = UserValidatorFactory.create();
    this.validate();
  }

  get name() {
    return this._name;
  }
  get username() {
    return this._username;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
  get role() {
    return this._role;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError([
        { context: 'user', message: 'Name cannot be empty' },
      ]);
    }

    this._name = value.trim();
    this.validate();
  }
  set username(value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError([
        { context: 'user', message: 'Username cannot be empty' },
      ]);
    }
    this._username = value.trim();
    this.validate();
  }
  set email(value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError([
        { context: 'user', message: 'Email cannot be empty' },
      ]);
    }
    this._email = value.trim();
    this.validate();
  }
  set password(value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError([
        { context: 'user', message: 'Password cannot be empty' },
      ]);
    }
    this._password = value.trim();
    this.validate();
  }
  set role(value: ROLES) {
    if (!value || value.trim().length === 0) {
      throw new DomainError([
        { context: 'user', message: 'Role cannot be empty' },
      ]);
    }
    const trimmed = value.trim().toUpperCase();

    if (!Object.values(ROLES).includes(trimmed as ROLES)) {
      throw new DomainError([{ context: 'user', message: `Invalid role: ${value}` }]);
    }

    this._role = trimmed as ROLES;
    this.validate();
  }

  toJSON(): UserToJSON {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }


}