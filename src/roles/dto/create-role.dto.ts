import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    example: "admin",
    description: "Role'ning nomi",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    example: "Adminjon",
    description: "Role'ning izohi",
  })
  @IsString()
  @IsOptional()
  description: string;
}
