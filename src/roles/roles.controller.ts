import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Role } from "./models/role.model";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: "Yangi role qo'shish" })
  @ApiCreatedResponse({
    description: "Yangi qo'shilgan role ma'lumotlari",
    type: Role,
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Role ro'yxatini olish" })
  @ApiOkResponse({
    description: "Role ro'yxati",
    type: [Role],
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: "Role'ni id'si orqali olish" })
  @ApiOkResponse({
    description: "Bitta role",
    type: Role,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOperation({ summary: "Role'ni id'si orqali yangilash" })
  @ApiOkResponse({
    description: "Yangilangan role",
    type: Role,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Role'ni id'si orqali o'chirish" })
  @ApiNoContentResponse({
    description: "O'chirilgan role id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Role successfully deleted" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
