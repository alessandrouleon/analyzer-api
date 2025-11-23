import { ROLES } from "@/@shared/constants/user.roles";

export class InputCreateUserUseCaseDto {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: ROLES;
}

export class OutputCreateUserUseCaseDto {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}