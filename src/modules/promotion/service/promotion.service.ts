import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/common/shared/services/base.abstract.service';
import { Promotion } from '../entities/promotion.entity';
import { PromotionRepository } from '../repositories/promotion.repository';
import { BaseRepositoryInterface } from 'src/common/shared/repository/base.interface.repository';
import { PromotionCreateDto } from '../dtos/promotion.create.dto';
import { transformDate } from 'src/utils';
import { ProductDto } from '../dtos/product.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class PromotionService extends BaseServiceAbstract<Promotion> {
  constructor(
    @Inject('PromotionRepositoryInterface')
    private readonly promotionRepository: BaseRepositoryInterface<Promotion>,
  ) {
    super(promotionRepository);
  }

  async create(promotionCreateDto: PromotionCreateDto): Promise<Promotion> {
    const startTime = transformDate(
      promotionCreateDto.dayStart,
      promotionCreateDto.timeStart,
    );
    return await this.promotionRepository.create({
      ...promotionCreateDto,
      startTime,
    });
  }

  async handleAddProductToCart(
    product: ProductDto,
  ): Promise<Promotion | string> {
    const promotion = await this.promotionRepository.findOneByCondition({
      shopId: product.shop['id'],
      promotionCategoryId: product.category['id'],
    } as FilterQuery<Promotion>);
    console.log(product);

    if (!promotion) {
      return 'Không có khuyến mãi phù hợp';
    }

    if (promotion.quantityUsed + product.quantity > promotion.limit) {
      return 'Hết số lượng khuyến mãi';
    }

    promotion.$inc('quantityUsed', product.quantity);
    await promotion.save();

    return promotion;
  }

  async handleRemoveCart(product: ProductDto) {
    //Kiem tra co giam gia khong
    const promotion = await this.promotionRepository.findOneByCondition({
      shopId: product.shop['id'],
      promotionCategoryId: product.category['id'],
    } as FilterQuery<Promotion>);

    promotion.$inc('quantityUsed', -product.quantity);
    await promotion.save();
  }
}
