import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreatePropertyDto {
  @ApiProperty({
    example: "content",
    description: "Property'ning nomi",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    example: "Bu text'ning matni",
    description: "Property'ning izohi",
  })
  @IsString()
  @IsOptional()
  description: string;
}
