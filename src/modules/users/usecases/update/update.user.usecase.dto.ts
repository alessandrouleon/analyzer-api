import { ROLES } from "@/shared/constants/user.roles";

export class InputUpdateUserUseCaseDto {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: ROLES;
}

export class OutputUpdateUserUseCaseDto {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}