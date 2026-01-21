
import AggregateRoot from "@/@shared/domain/entity/aggregate-root.interface";
import Entity from "@/@shared/domain/entity/entity.abstract";
import { DomainError } from "@/@shared/domain/error/domain.error";
import { ROLES } from "@/modules/auth/enums/roles.enum";
import { UserValidatorFactory } from "@/modules/users/factory/user.validator.factory";



export type UserIterfaces = {
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  roles: ROLES[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type UserToJSON = {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: ROLES[];
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
export class UserEntity extends Entity<UserEntity> implements AggregateRoot {
  private _name: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _roles: ROLES[];


  constructor(
    private readonly props: UserIterfaces
  ) {
    super(props.id, UserValidatorFactory.create(), props.createdAt, props.updatedAt, props.deletedAt);

    this._name = props.name;
    this._username = props.username;
    this._email = props.email;
    this._password = props.password;
    this._roles = props.roles

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
  get roles() {
    return this._roles;
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
  set roles(value: ROLES[]) {
    if (!value || value.length === 0) {
      throw new DomainError([
        { context: 'user', message: 'Roles cannot be empty' },
      ]);
    }
    const trimmed = value.map(role => role.trim().toUpperCase());

    if (!trimmed.every(role => Object.values(ROLES).includes(role as ROLES))) {
      throw new DomainError([{ context: 'user', message: `Invalid role: ${value}` }]);
    }

    this._roles = trimmed as ROLES[];
    this.validate();
  }

  toJSON(): UserToJSON {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }


}