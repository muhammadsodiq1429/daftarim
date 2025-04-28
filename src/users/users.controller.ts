import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { User } from "./models/user.model";
import { UserAuthGuard } from "../common/guards/user.auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Yangi user qo'shish",
  })
  @ApiCreatedResponse({
    description: "Yangi yaratilgan user id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "User successfully created" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: "User'lar ro'yxatini olish" })
  @ApiOkResponse({
    description: "Userlar ro'yxati",
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "User'ni id'si orqali olish" })
  @ApiOkResponse({ description: "Bitta user", type: User })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: "User'ni id'si orqali yangilash",
  })
  @ApiResponse({
    description: "Yangilanga user id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "User successfully updated" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: "User'ni id'si orqali o'chirish",
  })
  @ApiNoContentResponse({
    description: "O'chirilgan user id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "User successfully deleted" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
