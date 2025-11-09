import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "../usecases/create/create.user.usecase";
import { InputCreateUserUseCaseDto, OutputCreateUserUseCaseDto } from "../usecases/create/create.user.usecase.dto";

@Injectable()
export class UserFacade {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    async create(input: InputCreateUserUseCaseDto): Promise<OutputCreateUserUseCaseDto> {
        return await this.createUserUseCase.execute(input);
    }
}