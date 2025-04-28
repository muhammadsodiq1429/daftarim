import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Muhammad Sodiq",
    description: "Foydalanuvchi ismi",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Muhammad Yusuf",
    description: "Foydalanuvchi otasi ismi",
    required: false,
  })
  @IsString()
  @IsOptional()
  last_name: string;

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
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: "photo1.jpg",
    description: "Foydalanuvchi profili uchun rasm",
    required: false,
  })
  @IsString()
  @IsOptional()
  photo: string;
}
