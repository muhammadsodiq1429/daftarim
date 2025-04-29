import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
