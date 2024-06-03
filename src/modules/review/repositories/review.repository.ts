import { BaseRepositoryAbstract } from 'src/common/shared/repository/base.abstract.repository';
import { Review, ReviewDocument } from '../entities/review.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { FindAllResponse } from 'src/types/common.type';

export class ReviewRepository extends BaseRepositoryAbstract<Review> {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewRepository: Model<ReviewDocument>,
  ) {
    super(reviewRepository);
  }

  async find(
    condition: FilterQuery<Review>,
    options?: QueryOptions<Review>,
  ): Promise<Review[]> {
    return await this.reviewRepository.find();
  }
}
