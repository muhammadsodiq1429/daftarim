import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({
    summary: "Yangi admin qo'shish",
  })
  // @ApiResponse({
  //   status: 409,
  //   description: "Email already exists",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       statusCode: { type: "integer", example: 409 },
  //       message: { type: "string", example: "Email already exists" },
  //       error: { type: "string", example: "Conflict" },
  //     },
  //   },
  // })
  @ApiCreatedResponse({
    description: "Yangi yaratilgan admin id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Admin successfully created" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Admin'lar ro'yxatini olish" })
  @ApiOkResponse({
    description: "Adminlar ro'yxati",
    type: [Admin],
  })
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "Admin'ni id'si orqali olish" })
  @ApiOkResponse({ description: "Bitta admin", type: Admin })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Admin'ni id'si orqali yangilash",
  })
  @ApiOkResponse({
    description: "Yangilanga admin id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Admin successfully updated" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @ApiOperation({
    summary: "Admin'ni id'si orqali o'chirish",
  })
  @ApiNoContentResponse({
    description: "O'chirilgan admin id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Admin successfully deleted" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
