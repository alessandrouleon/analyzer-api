import { PaginationInterface } from '@/@shared/repository/repository.interface';
import { ServiceOrderIterfaces } from '../../domain/entities/service.order.entity';

export class InputFindServiceOrderUseCaseDto {
    id: string;
    description: string;
    service_order_number: string;
    issue_date: Date;
    expected_delivery_date: string;
    status: string;
    priority: string;
    name: string;
    common_defects?: string[];
    accessories?: string[];
    physical_condition?: string[];
    tests_performed?: string[];
    image_url?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface OutputFindServiceOrderUseCaseDto {
    result: ServiceOrderIterfaces[];
    pagination: PaginationInterface;
}

