import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from './modules/review/review.module';
import { PromotionModule } from './modules/promotion/promotion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, { autoCreate: true }),
    ReviewModule,
    PromotionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
