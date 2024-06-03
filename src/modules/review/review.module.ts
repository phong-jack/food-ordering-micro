import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewRepository } from './repositories/review.repository';
import { Review, ReviewSchema } from './entities/review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],

  controllers: [ReviewController],
  providers: [
    ReviewService,
    {
      provide: 'ReviewRepositoryInterface',
      useClass: ReviewRepository,
    },
  ],
})
export class ReviewModule {}
