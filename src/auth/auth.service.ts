import * as bcrypt from "bcrypt";
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { AdminsService } from "../admins/admins.service";
import { AdminsModule } from "../admins/admins.module";
import { User } from "../users/models/user.model";
import { Admin } from "../admins/models/admin.model";
import { FileService } from "../file/file.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminsService,
    private readonly jwtService: JwtService,
    private readonly fileService: FileService
  ) {}

  private async generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role_id: user.role_id ?? null,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.SECRET_TIME,
    });
  }

  async signUpUser(createUserDto: CreateUserDto /*image: any*/) {
    const condidant = await this.userService.findByEmail(createUserDto.email);
    if (condidant) throw new ConflictException("Email already exists");

    // const fileName = await this.fileService.saveFile(image);
    const newUser = await this.userService.create({
      ...createUserDto,
      // photo: fileName,
    });

    return { message: "User successfully signed up", id: newUser.id };
  }

  async signInUser(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );
    if (!validPassword) throw new UnauthorizedException("Invalid credentials");

    return { token: await this.generateToken(user) };
  }

  async signInAdmin(signInDto: SignInDto) {
    const admin = await this.adminService.findByEmail(signInDto.email);

    if (!admin) throw new UnauthorizedException("Invalid credentials");

    const validPassword = await bcrypt.compare(
      signInDto.password,
      admin.password
    );
    if (!validPassword) throw new UnauthorizedException("Invalid credentials");

    if (!admin.is_active) {
      throw new UnauthorizedException("Admin account is deactivated");
    }

    return { token: await this.generateToken(admin) };
  }
}
