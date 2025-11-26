import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { ServiceOrderRepositoryInterface } from "../../repository/service.order.repository.interface";

@Injectable()
export class DeleteServiceOrderUseCase {
    constructor(
        @Inject('ServiceOrderRepositoryInterface')
        private readonly serviceOrderRepository: ServiceOrderRepositoryInterface,
    ) { }

    async execute(id: string): Promise<void> {

        const existsServiceOrder = await this.serviceOrderRepository.findOneById(id);

        if (!existsServiceOrder) {
            throw new BadRequestException(`ServiceOrder with ID ${id} not found`);
        }

        const deleteServiceOrder = await this.serviceOrderRepository.delete(id);

        Logger.log(
            `ServiceOrder deleted. [ID: ${deleteServiceOrder.id}][name: ${deleteServiceOrder.name}]`,
            'DeleteServiceOrderUseCase.execute',
        );

    }
}
