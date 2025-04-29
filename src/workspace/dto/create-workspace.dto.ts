import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsNumberString()
  created_by: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: any;

  @IsString()
  @IsNotEmpty()
  category: string; //"work" | "personal life" | "school";

  @IsString()
  @IsNotEmpty()
  management: string; //"withteam" | "own";
}
