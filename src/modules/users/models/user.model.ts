import { BaseSchema } from '@/@shared/repository/base-model';
import { ROLES } from '@/modules/auth/enums/roles.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({ type: String, required: false, unique: true, trim: true })
  username: string;

  @Prop({ type: String, required: false, unique: true, trim: true })
  email?: string;

  @Prop({ type: String, required: false, trim: true })
  password: string;

  @Prop({
    type: [String],
    enum: Object.values(ROLES),
    default: [ROLES.USER]
  })
  roles?: ROLES[];
}

export const UserSchema = SchemaFactory.createForClass(User);
