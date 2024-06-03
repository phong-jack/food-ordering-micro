import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common/shared/base/base.entity';

export type PromotionDocument = HydratedDocument<Promotion>;

@Schema({
  timestamps: true,
})
export class Promotion extends BaseEntity {
  @Prop({ required: true })
  shopId: number;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  durationHours: number;

  @Prop({ required: true })
  promotionCategoryId: number[];

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  limit: number;

  @Prop({
    default: 0,
    validate: {
      validator: function (value) {
        return value <= this.limit;
      },
      message: `quantityUsed do not exceeds the limit`,
    },
  })
  quantityUsed: number;

  
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
