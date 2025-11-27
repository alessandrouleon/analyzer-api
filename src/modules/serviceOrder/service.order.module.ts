import { IdService } from "@/@shared/services/id.service";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ServiceOrderController } from "./controllers/service.order.controller";
import { ServiceOrderFacade } from "./facade/service.order.facade";
import { ServiceOrder, ServiceOrderSchema } from "./model/service.order.model";
import { ServiceOrderRepository } from "./repository/service.order.repository";
import { CreateServiceOrderUseCase } from "./usecases/create/create.service.order.usecase";
import { DeleteServiceOrderUseCase } from "./usecases/delete/delete.service.order.usecase";
import { FindAllServiceOrderUseCase } from "./usecases/findAll/find-all.service.order.usecase";
import { FindByIdServiceOrderUseCase } from "./usecases/findById/findById.service.order.usecase";
import { UpdateServiceOrderUseCase } from "./usecases/update/update.service.order.usecase";

@Module({
    imports: [MongooseModule.forFeature([{ name: ServiceOrder.name, schema: ServiceOrderSchema }])],
    controllers: [ServiceOrderController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        //Facade
        ServiceOrderFacade,

        //Services
        IdService,

        //Repositories
        {
            provide: 'ServiceOrderRepositoryInterface',
            useClass: ServiceOrderRepository,
        },

        //UseCases
        CreateServiceOrderUseCase,
        UpdateServiceOrderUseCase,
        FindByIdServiceOrderUseCase,
        FindAllServiceOrderUseCase,
        DeleteServiceOrderUseCase,
    ],
    exports: []
})

export class ServiceOrderModule { }