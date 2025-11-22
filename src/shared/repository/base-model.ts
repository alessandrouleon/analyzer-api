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

  @Prop({ type: Date, default: null })
  updatedAt?: Date;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}
