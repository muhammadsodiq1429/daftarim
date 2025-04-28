import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "User uchun ro'yxatdan o'tish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yxatdan o'tgan user id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "User successfully signed up" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Post("sign-up-user")
  @UseInterceptors(FileInterceptor("image"))
  signUpUser(@Body() createUserDto: CreateUserDto, @UploadedFile() image: any) {
    return this.authService.signUpUser(createUserDto, image);
  }

  @ApiOperation({ summary: "User uchun sing in" })
  @ApiResponse({
    status: 201,
    description: "Sign in qilgan user uchun token",
    schema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5dXN1ZnNpcm9qaWRkaW5vdi41NTYyQGdtYWlsLmNvbSIsInJvbGVfaWQiOm51bGwsImlhdCI6MTc0NTc0OTg1MCwiZXhwIjoxNzQ1ODAzODUwfQ.dcvOcBduK4-HrDONb49eQh_bj1TTp3tPcoMS0FdVBrI",
        },
      },
    },
  })
  @Post("sign-in-user")
  singInUser(@Body() signInDto: SignInDto) {
    return this.authService.signInUser(signInDto);
  }

  @ApiOperation({ summary: "Admin uchun sing in" })
  @ApiResponse({
    status: 201,
    description: "Sign in qilgan admin uchun token",
    schema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5dXN1ZnNpcm9qaWRkaW5vdi41NTYyQGdtYWlsLmNvbSIsInJvbGUiOm51bGwsImlhdCI6MTc0NTczMzQ0MiwiZXhwIjoxNzQ1Nzg3NDQyfQ.xcw9qdCoMeSQkmLu3IZomjY5EmJExadYiYAWVks0290",
        },
      },
    },
  })
  @Post("sign-in-admin")
  singInAdmin(@Body() signInDto: SignInDto) {
    return this.authService.signInAdmin(signInDto);
  }
}
