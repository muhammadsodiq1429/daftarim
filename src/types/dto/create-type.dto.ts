import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTypeDto {
  @ApiProperty({
    example: "text",
    description: "Block uchun biron bir tur",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    example: "Matnlar uchun block turi",
    description: "Turning tavsifi",
  })
  @IsString()
  @IsOptional()
  description: string;
}
