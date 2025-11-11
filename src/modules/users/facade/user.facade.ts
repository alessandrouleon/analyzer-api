import { FindFilterInterface } from "@/@shared/repository/repository.interface";
import { Injectable } from "@nestjs/common";
import { UserIterfaces } from "../domain/entities/user.entity";
import { CreateUserUseCase } from "../usecases/create/create.user.usecase";
import { InputCreateUserUseCaseDto, OutputCreateUserUseCaseDto } from "../usecases/create/create.user.usecase.dto";
import { DeleteUserUseCase } from "../usecases/delete/delete.user.usecase";
import { FindAllUserUseCase } from "../usecases/findAll/find-all.user.usecase";
import { FindByIdUserUseCase } from "../usecases/findById/findById.user.usecase";
import { OutputFindByIdUserUseCaseDto } from "../usecases/findById/findById.user.usecase.dto";
import { UpdateUserUseCase } from "../usecases/update/update.user.usecase";
import { InputUpdateUserUseCaseDto, OutputUpdateUserUseCaseDto } from "../usecases/update/update.user.usecase.dto";

@Injectable()
export class UserFacade {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findByIdUserUseCase: FindByIdUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly findAllUserUseCase: FindAllUserUseCase
    ) { }

    async create(input: InputCreateUserUseCaseDto): Promise<OutputCreateUserUseCaseDto> {
        return await this.createUserUseCase.execute(input);
    }

    async update(input: InputUpdateUserUseCaseDto): Promise<OutputUpdateUserUseCaseDto> {
        return await this.updateUserUseCase.execute(input);
    }

    async findById(id: string): Promise<OutputFindByIdUserUseCaseDto> {
        return await this.findByIdUserUseCase.execute(id);
    }

    async find(filter: FindFilterInterface<UserIterfaces>) {
        return await this.findAllUserUseCase.execute(filter);
    }

    async delete(id: string): Promise<void> {
        return await this.deleteUserUseCase.execute(id);
    }
}