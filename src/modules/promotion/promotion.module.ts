import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from './entities/promotion.entity';
import { PromotionRepository } from './repositories/promotion.repository';
import { PromotionService } from './service/promotion.service';
import { PromotionController } from './controllers/promotion.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
  ],
  providers: [
    PromotionService,
    {
      provide: 'PromotionRepositoryInterface',
      useClass: PromotionRepository,
    },
  ],
  controllers: [PromotionController],
})
export class PromotionModule {}
