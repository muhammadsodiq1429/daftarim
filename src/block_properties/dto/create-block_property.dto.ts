import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlockPropertyDto {
  @IsNotEmpty()
  @IsNumber()
  blockId: number;

  @IsNotEmpty()
  @IsNumber()
  propertyId: number;

  @IsNotEmpty()
  @IsString()
  value: string;
}
