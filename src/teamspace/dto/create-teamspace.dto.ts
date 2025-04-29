import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumberString,
} from "class-validator";

export class CreateTeamspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsNotEmpty()
  workspace_id: number;

  @IsNumberString()
  @IsNotEmpty()
  created_by: number;

  @IsNumberString()
  @IsNotEmpty()
  permission_id: number;
}
