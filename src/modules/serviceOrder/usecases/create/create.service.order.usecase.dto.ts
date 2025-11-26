export class InputCreateServiceOrderUseCaseDto {
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
}

export class OutputCreateServiceOrderUseCaseDto {
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

