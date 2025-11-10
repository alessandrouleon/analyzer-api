import { Injectable } from "@nestjs/common";
import { CreateUserUseCase } from "../usecases/create/create.user.usecase";
import { InputCreateUserUseCaseDto, OutputCreateUserUseCaseDto } from "../usecases/create/create.user.usecase.dto";
import { FindByIdUserUseCase } from "../usecases/findById/findById.user.usecase";
import { OutputFindByIdUserUseCaseDto } from "../usecases/findById/findById.user.usecase.dto";

@Injectable()
export class UserFacade {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findByIdUserUseCase: FindByIdUserUseCase
    ) { }

    async create(input: InputCreateUserUseCaseDto): Promise<OutputCreateUserUseCaseDto> {
        return await this.createUserUseCase.execute(input);
    }

    async findById(id: string): Promise<OutputFindByIdUserUseCaseDto> {
        return await this.findByIdUserUseCase.execute(id);
    }
}