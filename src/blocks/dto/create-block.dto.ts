import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBlockDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  parent_block: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  order_index: number;
}
