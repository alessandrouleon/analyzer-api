import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { ServiceOrderRepositoryInterface } from "../../repository/service.order.repository.interface";
import { OutputFindByIdServiceOrderUseCaseDto } from "./findById.service.order.usecase.dto";

@Injectable()
export class FindByIdServiceOrderUseCase {

    constructor(
        @Inject('ServiceOrderRepositoryInterface')
        private readonly serviceOrderRepository: ServiceOrderRepositoryInterface,
    ) { }
    async execute(id: string): Promise<OutputFindByIdServiceOrderUseCaseDto> {
        const serviceOrder = await this.serviceOrderRepository.findOneById(id);

        if (!serviceOrder) {
            throw new BadRequestException(`ServiceOrder with ID ${id} not found`);
        }

        Logger.log(
            `ServiceOrder found. [ID: ${serviceOrder.id}][name: ${serviceOrder.name}]`,
            'FindByIdServiceOrderUseCase.execute',
        );

        return serviceOrder?.toJSON();
    }

}