import { FindFilterInterface } from "@/@shared/repository/repository.interface";
import { Injectable } from "@nestjs/common";
import { ServiceOrderIterfaces } from "../domain/entities/service.order.entity";
import { CreateServiceOrderUseCase } from "../usecases/create/create.service.order.usecase";
import { InputCreateServiceOrderUseCaseDto, OutputCreateServiceOrderUseCaseDto } from "../usecases/create/create.service.order.usecase.dto";
import { DeleteServiceOrderUseCase } from "../usecases/delete/delete.service.order.usecase";
import { FindAllServiceOrderUseCase } from "../usecases/findAll/find-all.service.order.usecase";
import { FindByIdServiceOrderUseCase } from "../usecases/findById/findById.service.order.usecase";
import { OutputFindByIdServiceOrderUseCaseDto } from "../usecases/findById/findById.service.order.usecase.dto";
import { UpdateServiceOrderUseCase } from "../usecases/update/update.service.order.usecase";
import { InputUpdateServiceOrderUseCaseDto, OutputUpdateServiceOrderUseCaseDto } from "../usecases/update/update.service.order.usecase.dto";

@Injectable()
export class ServiceOrderFacade {
    constructor(
        private readonly createServiceOrderUseCase: CreateServiceOrderUseCase,
        private readonly findByIdServiceOrderUseCase: FindByIdServiceOrderUseCase,
        private readonly updateServiceOrderUseCase: UpdateServiceOrderUseCase,
        private readonly deleteServiceOrderUseCase: DeleteServiceOrderUseCase,
        private readonly findAllServiceOrderUseCase: FindAllServiceOrderUseCase
    ) { }

    async create(input: InputCreateServiceOrderUseCaseDto): Promise<OutputCreateServiceOrderUseCaseDto> {
        return await this.createServiceOrderUseCase.execute(input);
    }

    async update(input: InputUpdateServiceOrderUseCaseDto): Promise<OutputUpdateServiceOrderUseCaseDto> {
        return await this.updateServiceOrderUseCase.execute(input);
    }

    async findById(id: string): Promise<OutputFindByIdServiceOrderUseCaseDto> {
        return await this.findByIdServiceOrderUseCase.execute(id);
    }

    async find(filter: FindFilterInterface<ServiceOrderIterfaces>) {
        return await this.findAllServiceOrderUseCase.execute(filter);
    }

    async delete(id: string): Promise<void> {
        return await this.deleteServiceOrderUseCase.execute(id);
    }
}