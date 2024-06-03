import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewCreateDto {
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
