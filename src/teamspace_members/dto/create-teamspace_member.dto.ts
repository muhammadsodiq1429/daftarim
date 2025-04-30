import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTeamspaceMemberDto {
  @IsNumber()
  @IsNotEmpty()
  teamspace_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsBoolean()
  is_member: boolean;
}
