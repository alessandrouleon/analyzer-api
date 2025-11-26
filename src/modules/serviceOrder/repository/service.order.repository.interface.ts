import RepositoryInterface from "@/@shared/repository/repository.interface";
import { ServiceOrderEntity } from "../domain/entities/service.order.entity";

export interface ServiceOrderRepositoryInterface extends RepositoryInterface<ServiceOrderEntity> { }