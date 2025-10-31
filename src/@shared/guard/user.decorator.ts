import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class UserDto {
  id: string;
  name: string;
  email: string;
  type: string;

  constructor(id: string, name: string, email: string, type: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type;
  }

  isAdmin(): boolean {
    return this.type === 'admin';
  }
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return new UserDto(user.id, user.name, user.email, user.type);
  },
);
