import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { PromotionService } from '../service/promotion.service';
import { PromotionCreateDto } from '../dtos/promotion.create.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductDto } from '../dtos/product.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private promotionService: PromotionService) {}

  @EventPattern('promotion.created')
  async create(@Payload() promotionCreateDto: PromotionCreateDto) {
    return await this.promotionService.create(promotionCreateDto);
  }

  @EventPattern('add.product')
  async handleAddProductToCart(@Payload() product: ProductDto) {
    return await this.promotionService.handleAddProductToCart(product);
  }

  @EventPattern('remove.cart')
  async handleRemoveCart(@Payload() product: ProductDto) {
    return await this.promotionService.handleRemoveCart(product);
  }
}
