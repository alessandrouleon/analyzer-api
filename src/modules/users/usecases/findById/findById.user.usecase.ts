import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { UserRepositoryInterface } from "../../repository/user.repository.interface";
import { OutputFindByIdUserUseCaseDto } from "./findById.user.usecase.dto";

@Injectable()
export class FindByIdUserUseCase {

    constructor(
        @Inject('UserRepositoryInterface')
        private readonly useRepository: UserRepositoryInterface
    ) { }
    async execute(id: string): Promise<OutputFindByIdUserUseCaseDto> {
        const user = await this.useRepository.findOneById(id);

        if (!user) {
            throw new BadRequestException(`User with ID ${id} not found`);
        }

        Logger.log(
            `User found. [ID: ${user.id}][name: ${user.name}]`,
            'FindByIdUserUseCase.execute',
        );

        return user?.toJSON();
    }

}