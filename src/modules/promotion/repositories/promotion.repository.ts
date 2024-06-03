import { BaseRepositoryAbstract } from 'src/common/shared/repository/base.abstract.repository';
import { Promotion, PromotionDocument } from '../entities/promotion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class PromotionRepository extends BaseRepositoryAbstract<PromotionDocument> {
  constructor(
    @InjectModel(Promotion.name)
    private readonly promotionModel: Model<PromotionDocument>,
  ) {
    super(promotionModel);
  }
}
