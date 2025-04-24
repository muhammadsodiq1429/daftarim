import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
