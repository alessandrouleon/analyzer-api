
import AggregateRoot from "@/@shared/domain/entity/aggregate-root.interface";
import Entity from "@/@shared/domain/entity/entity.abstract";
import { DomainError } from "@/@shared/domain/error/domain.error";
import { ServiceOrderValidatorFactory } from "../../factory/service.order.validator.factory";



export type ServiceOrderIterfaces = {
    id?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type ServiceOrderToJSON = {
    id: string;
    description: string;
    service_order_number: string;
    issue_date: Date;
    expected_delivery_date: string;
    status: string;
    priority: string;
    name: string;
    common_defects: string[];
    accessories: string[];
    physical_condition: string[];
    tests_performed: string[];
    image_url?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export class ServiceOrderEntity extends Entity<ServiceOrderEntity> implements AggregateRoot {

    private _description: string;
    private _service_order_number: string;
    private _issue_date: Date;
    private _expected_delivery_date: string;
    private _status: string;
    private _priority: string;
    private _name: string;
    private _common_defects?: string[];
    private _accessories?: string[];
    private _physical_condition?: string[];
    private _tests_performed?: string[];
    private _image_url?: string;


    constructor(
        private readonly props: ServiceOrderIterfaces
    ) {
        super(props.id, ServiceOrderValidatorFactory.create(), props.createdAt, props.updatedAt, props.deletedAt);

        this._name = props.name;
        this._description = props.description;
        this._service_order_number = props.service_order_number;
        this._issue_date = props.issue_date;
        this._expected_delivery_date = props.expected_delivery_date;
        this._status = props.status;
        this._priority = props.priority;
        this._common_defects = props.common_defects;
        this._accessories = props.accessories;
        this._physical_condition = props.physical_condition;
        this._tests_performed = props.tests_performed;
        this._image_url = props.image_url;
        this.validate();
    }

    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get service_order_number() {
        return this._service_order_number;
    }
    get issue_date() {
        return this._issue_date;
    }
    get expected_delivery_date() {
        return this._expected_delivery_date;
    }

    get status() {
        return this._status;
    }
    get priority() {
        return this._priority;
    }
    get common_defects() {
        return this._common_defects;
    }
    get accessories() {
        return this._accessories;
    }
    get physical_condition() {
        return this._physical_condition;
    }
    get tests_performed() {
        return this._tests_performed;
    }
    get image_url() {
        return this._image_url;
    }


    set name(value: string) {
        if (!value || value.trim().length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Name cannot be empty' },
            ]);
        }

        this._name = value.trim();
        this.validate();
    }

    set description(value: string) {
        if (!value || value.trim().length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Description cannot be empty' },
            ]);
        }

        this._description = value.trim();
        this.validate();
    }

    set service_order_number(value: string) {
        if (!value || value.trim().length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Service order number cannot be empty' },
            ]);
        }

        this._service_order_number = value.trim();
        this.validate();
    }

    set issue_date(value: Date) {
        if (!value) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Issue date cannot be empty' },
            ]);
        }

        this._issue_date = value;
        this.validate();
    }
    set expected_delivery_date(value: string) {
        if (!value || value.trim().length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Expected delivery date cannot be empty' },
            ]);
        }

        this._expected_delivery_date = value.trim();
        this.validate();
    }

    set status(value: string) {
        if (!value || value.trim().length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Status cannot be empty' },
            ]);
        }

        this._status = value.trim();
        this.validate();
    }

    set priority(value: string) {
        if (!value || value.trim().length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Priority cannot be empty' },
            ]);
        }

        this._priority = value.trim();
        this.validate();
    }

    set common_defects(value: string[]) {
        if (!value || value.length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Common defects cannot be empty' },
            ]);
        }

        this._common_defects = value;
        this.validate();
    }

    set accessories(value: string[]) {
        if (!value || value.length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Accessories cannot be empty' },
            ]);
        }

        this._accessories = value;
        this.validate();
    }

    set physical_condition(value: string[]) {
        if (!value || value.length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Physical condition cannot be empty' },
            ]);
        }

        this._physical_condition = value;
        this.validate();
    }

    set tests_performed(value: string[]) {
        if (!value || value.length === 0) {
            throw new DomainError([
                { context: 'serviceOrder', message: 'Tests performed cannot be empty' },
            ]);
        }

        this._tests_performed = value;
        this.validate();
    }

    set image_url(value: string) {
        this._image_url = value;
        this.validate();
    }


    toJSON(): ServiceOrderToJSON {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            service_order_number: this.service_order_number,
            issue_date: this.issue_date,
            expected_delivery_date: this.expected_delivery_date,
            status: this.status,
            priority: this.priority,
            common_defects: this.common_defects,
            accessories: this.accessories,
            physical_condition: this.physical_condition,
            tests_performed: this.tests_performed,
            image_url: this.image_url,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        };
    }


}