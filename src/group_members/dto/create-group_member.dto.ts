import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateGroupMemberDto {
  @IsNotEmpty()
  @IsNumber()
  group_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
