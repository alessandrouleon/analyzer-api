import { BaseSchema } from '@/@shared/repository/base-model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceOrderDocument = ServiceOrder & Document;

@Schema()
export class ServiceOrder extends BaseSchema {
    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    name: string;


    @Prop({
        type: String,
        required: true,
        trim: true
    })
    description: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    service_order_number: string;

    @Prop({ type: Date, default: Date.now })
    issue_date: Date;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    expected_delivery_date: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    status: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    priority: string;

    @Prop({ type: [String], default: [] })
    common_defects: string[];

    @Prop({ type: [String], default: [] })
    accessories?: string[];

    @Prop({ type: [String], default: [] })
    physical_condition?: string[];

    @Prop({ type: [String], default: [] })
    tests_performed?: string[];

    @Prop({
        type: String,
        required: false,
    })
    image_url?: any;

}

export const ServiceOrderSchema = SchemaFactory.createForClass(ServiceOrder);
