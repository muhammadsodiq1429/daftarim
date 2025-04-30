import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  block_id: number;

  @IsNotEmpty()
  @IsBoolean()
  is_edited: boolean;
}
