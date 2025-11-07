import { ROLES } from '@/@shared/constants/user.roles';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../../@shared/repository/base-model';

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

  @Prop({ type: String, required: false })
  email?: string;

  @Prop({ type: String, required: false, trim: true })
  password: string;

  @Prop({ type: String, required: false, trim: true, enum: Object.values(ROLES) })
  role: ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User);
