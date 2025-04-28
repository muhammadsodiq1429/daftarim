import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "muhammadsodiq@mail.uz",
    description: "Foydalanuvchi elektron manzili",
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "@Qwerty-123456",
    description: "Foydalanuvhi paroli, kuchli bo'lishi kerak",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
