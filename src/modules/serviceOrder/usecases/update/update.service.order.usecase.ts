import { Inject, Injectable, Logger } from "@nestjs/common";
import { ServiceOrderEntity } from "../../domain/entities/service.order.entity";
import { ServiceOrderRepositoryInterface } from "../../repository/service.order.repository.interface";
import { InputUpdateServiceOrderUseCaseDto, OutputUpdateServiceOrderUseCaseDto } from "./update.service.order.usecase.dto";


@Injectable()
export class UpdateServiceOrderUseCase {
   constructor(
      @Inject('ServiceOrderRepositoryInterface')
      private readonly serviceOrderRepository: ServiceOrderRepositoryInterface,
   ) { }

   async execute(input: InputUpdateServiceOrderUseCaseDto): Promise<OutputUpdateServiceOrderUseCaseDto> {

      const serviceOrder = new ServiceOrderEntity({
         id: input.id,
         name: input.name,
         description: input.description,
         service_order_number: input.service_order_number,
         issue_date: input.issue_date,
         expected_delivery_date: input.expected_delivery_date,
         status: input.status,
         priority: input.priority,
         common_defects: input.common_defects,
         accessories: input.accessories,
         physical_condition: input.physical_condition,
         tests_performed: input.tests_performed,
         image_url: input.image_url,
      });

      const serviceOrderuPdated = await this.serviceOrderRepository.update(serviceOrder);

      Logger.log(
         `Service Order . [ID: ${serviceOrder.id}][name: ${serviceOrder.name}]`,
         'UpdateServiceOrderUseCase.execute',
      );

      return serviceOrderuPdated.toJSON();
   }
}