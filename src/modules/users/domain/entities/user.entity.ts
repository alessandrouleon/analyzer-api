
import { ROLES } from "@/@shared/constants/user.roles";
import Entity from "@/@shared/domain/entity/entity.abstract";
import ValidatorInterface from "@/@shared/domain/validator/validator.interface";
import { UserValidatorFactory } from "../../factory/user.validator.factory";



export type UserProps = {
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: ROLES;
  createdAt?: Date;
  updatedAt?: Date;
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
}
export class UserEntity extends Entity<UserEntity> {
  private _name: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _role: ROLES;

  validator: ValidatorInterface<UserEntity>;

  constructor(
    private readonly props: UserProps
  ) {
    super(props.id, UserValidatorFactory.create(), props.createdAt, props.updatedAt);

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
    this._name = value.trim();
    this.validate();
  }
  set username(value: string) {
    this._username = value.trim();
    this.validate();
  }
  set email(value: string) {
    this._email = value.trim();
    this.validate();
  }
  set password(value: string) {
    this._password = value.trim();
    this.validate();
  }
  set role(value: ROLES) {
    const trimmed = value.trim().toUpperCase();
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
    };
  }


}