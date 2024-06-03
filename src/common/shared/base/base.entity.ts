import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BaseEntity extends Document {
  _id?: string;

  @Prop({ default: null })
  deletedAt?: Date;
}
