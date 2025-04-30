import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateWorkspaceMemberDto {
  @IsNotEmpty()
  @IsNumber()
  workspace_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsBoolean()
  is_admin: boolean;
}
