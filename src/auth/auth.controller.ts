import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up-user")
  signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @Post("sign-in-user")
  singInUser(@Body() signInDto: SignInDto) {
    return this.authService.signInUser(signInDto);
  }

  @Post("sign-in-admin")
  singInAdmin(@Body() signInDto: SignInDto) {
    return this.authService.signInAdmin(signInDto);
  }
}
