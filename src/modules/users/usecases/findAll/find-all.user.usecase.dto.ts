import { UserIterfaces } from '@/modules/users/domain/entities/user.entity';
import { ROLES } from '@/shared/constants/user.roles';
import { PaginationInterface } from '@/shared/repository/repository.interface';

export class InputFindUserUseCaseDto {
    name: string;
    username: string;
    email: string;
    role: ROLES;
}


export interface OutputFindUsersUseCaseDto {
    result: UserIterfaces[];
    pagination: PaginationInterface;
}

