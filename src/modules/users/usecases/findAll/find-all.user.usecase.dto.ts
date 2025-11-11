import { ROLES } from '@/@shared/constants/user.roles';
import { PaginationInterface } from '../../../../@shared/repository/repository.interface';
import { UserIterfaces } from '../../domain/entities/user.entity';

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

