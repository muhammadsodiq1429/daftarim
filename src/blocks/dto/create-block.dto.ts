import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBlockDto {
  @ApiProperty({
    example: 1,
    description:
      "Block qanday type'da ekanini bilish uchun type table'sidagi type id",
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @ApiProperty({
    example: 1,
    description:
      "Block kimga tegishli ekani bilish uchun users table'sidagi user id",
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @ApiProperty({
    example: 1,
    description:
      "Block'ning otasi kim ekanini bilish uchun block table'sigadagi block id",
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  parent_block: number;

  @ApiProperty({
    example: 1,
    description: "Block'ning joylashuvini aniqlash uchun",
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  order_index: number;
}
