import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);

    if (user) throw new ConflictException("Email already exists");
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userModel.create(createUserDto);

    return { message: "User successfully created", id: newUser.id };
  }

  async findAll() {
    const allUsers = await this.userModel.findAll({ include: { all: true } });
    if (allUsers.length === 0) throw new NotFoundException("User not found");

    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (await this.findByEmail(user.email)) throw new ConflictException("Email already exists")
      await user.update(updateUserDto);

    return { message: "User successfully updated", updatedUser: user };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();

    return { message: "User successfully deleted", id };
  }
}
