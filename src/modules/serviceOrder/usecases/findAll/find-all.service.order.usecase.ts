import { FindFilterInterface } from "@/@shared/repository/repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { ServiceOrderRepositoryInterface } from "../../repository/service.order.repository.interface";
import { OutputFindServiceOrderUseCaseDto } from "./find-all.service.order.usecase.dto";


@Injectable()
export class FindAllServiceOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepositoryInterface')
        private readonly serviceOrderRepository: ServiceOrderRepositoryInterface,
    ) { }
    async execute(filter: FindFilterInterface): Promise<OutputFindServiceOrderUseCaseDto> {

        const serviceOrder = await this.serviceOrderRepository.find(filter);

        return {
            result: serviceOrder.result,
            pagination: serviceOrder.pagination
        };
    }
}