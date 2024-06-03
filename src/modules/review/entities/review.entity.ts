import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common/shared/base/base.entity';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review extends BaseEntity {
  @Prop()
  id: number;

  @Prop({
    min: 1,
    max: 5,
  })
  rating: number;

  @Prop()
  content: string;

  @Prop()
  userId: number;

  @Prop()
  shopId: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
