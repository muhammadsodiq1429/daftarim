import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsNumber()
  created_by: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsNotEmpty()
  category: string; //"work" | "personal life" | "school";

  @IsString()
  @IsNotEmpty()
  management: string; //"withteam" | "own";
}
