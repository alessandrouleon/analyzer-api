import { FindFilterInterface } from "@/@shared/repository/repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "../../repository/user.repository.interface";
import { OutputFindUsersUseCaseDto } from "./find-all.user.usecase.dto";


@Injectable()
export class FindAllUserUseCase {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface,
    ) { }
    async execute(filter: FindFilterInterface): Promise<OutputFindUsersUseCaseDto> {

        const user = await this.userRepository.find(filter);

        return {
            result: user.result,
            pagination: user.pagination
        };
    }
}