import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewRepository } from './repositories/review.repository';
import { Review } from './entities/review.entity';
import { BaseRepositoryInterface } from 'src/common/shared/repository/base.interface.repository';
import { BaseServiceAbstract } from 'src/common/shared/services/base.abstract.service';
import { FindAllResponse } from 'src/types/common.type';

@Injectable()
export class ReviewService extends BaseServiceAbstract<Review> {
  constructor(
    @Inject('ReviewRepositoryInterface')
    private readonly reviewRepository: BaseRepositoryInterface<Review>,
  ) {
    super(reviewRepository);
  }

  async findAll(filter: object, options?: object): Promise<Review[]> {
    const reviews = await this.reviewRepository.findAll(filter, options);
    return reviews;
  }
}
