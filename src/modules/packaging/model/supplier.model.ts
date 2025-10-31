import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../../@shared/repository/base-model';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({ type: String, required: false })
  contactEmail?: string;

  @Prop({ type: String, required: false })
  phoneNumber?: string;

  @Prop({ type: String, required: false, trim: true })
  cnpj?: string;

  @Prop({ type: String, required: false, trim: true })
  website?: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
