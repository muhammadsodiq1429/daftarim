import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "Muhammad Sodiq Muhammad Yusuf",
    description: "Adminning to'liq ismi",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "muhammadsodiq@mail.uz",
    description: "Adminning elektron manzili",
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "@Qwerty-123456",
    description: "Adminning paroli, kuchli bo'lishi kerak",
    required: true,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: "1",
    description: "Adminning ro'li, boshqa tablega ulangan",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({
    example: true,
    description:
      "Adminning activeligi, uni faqat super admin o'zgartira oladi.",
    required: true,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
