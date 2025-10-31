import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export interface ModifiedBy {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string;
}

@Schema({ timestamps: true })
export class BaseSchema {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Object, required: false })
  modifiedBy?: ModifiedBy;

  @Prop({ type: String, required: false })
  reason?: string;
}
