import {
  IsDateString,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  last_active: Date;

  @IsNotEmpty()
  @IsString()
  lacation: string;

  @IsJSON()
  information: string;
}
