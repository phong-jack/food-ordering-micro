// product.dto.ts

import {
  IsInt,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class ProductDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  isAlready: boolean;

  @IsInt()
  category: object;

  @IsInt()
  shop: object;
}
