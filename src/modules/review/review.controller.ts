import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { FilterQuery } from 'mongoose';
import { Review } from './entities/review.entity';
import { ReviewCreateDto } from './dtos/review.create.dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @EventPattern('review_getAll')
  async findAll(@Payload() filter: FilterQuery<Review>) {
    return await this.reviewService.findAll(filter);
  }

  @EventPattern('review_getOne')
  async findOne(@Payload() id: string) {
    return await this.reviewService.findOne(id);
  }

  @EventPattern('review_created')
  async reviewCreated(@Payload() reviewCreateDto: ReviewCreateDto) {
    console.log('Check review dto:: ', reviewCreateDto);

    const newReview = await this.reviewService.create(reviewCreateDto);
    return newReview;
  }

  @EventPattern('review_updated')
  async update(@Payload() dto: any) {
    const { id, reviewUpdateDto } = dto;
    return await this.reviewService.update(id.toString(), reviewUpdateDto);
  }

  @EventPattern('review_deleted')
  async delete(@Payload() id: string) {
    console.log('Check id:: ', id);
    return await this.reviewService.remove(id.toString());
  }
}
