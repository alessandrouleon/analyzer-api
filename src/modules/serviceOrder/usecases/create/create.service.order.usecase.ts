import { IdService } from "@/@shared/services/id.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ServiceOrderEntity } from "../../domain/entities/service.order.entity";
import { ServiceOrderRepositoryInterface } from "../../repository/service.order.repository.interface";
import { InputCreateServiceOrderUseCaseDto, OutputCreateServiceOrderUseCaseDto } from "./create.service.order.usecase.dto";


@Injectable()
export class CreateServiceOrderUseCase {
   constructor(
      @Inject('ServiceOrderRepositoryInterface')
      private readonly serviceOrderRepository: ServiceOrderRepositoryInterface,
      private readonly idService: IdService,
   ) { }

   async execute(input: InputCreateServiceOrderUseCaseDto): Promise<OutputCreateServiceOrderUseCaseDto> {

      const serviceOrder = new ServiceOrderEntity({
         id: this.idService.generate(),
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

      const serviceOrderCreated = await this.serviceOrderRepository.create(serviceOrder);

      Logger.log(
         `Service Order created. [ID: ${serviceOrder.id}][name: ${serviceOrder.name}]`,
         'CreateServiceOrderUseCase.execute',
      );

      return serviceOrderCreated.toJSON();
   }
}