import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Type } from "./models/type.model";

@Controller("types")
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @ApiOperation({ summary: "Yangi Type qo'shish" })
  @ApiCreatedResponse({
    description: "Yangi qo'shilgan Type ma'lumotlari",
    type: Type,
  })
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @ApiOperation({ summary: "Type ro'yxatini olish" })
  @ApiOkResponse({
    description: "Type ro'yxati",
    type: [Type],
  })
  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @ApiOperation({ summary: "Type'ni id'si orqali olish" })
  @ApiOkResponse({
    description: "Bitta Type",
    type: Type,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.typesService.findOne(+id);
  }

  @ApiOperation({ summary: "Type'ni id'si orqali yangilash" })
  @ApiOkResponse({
    description: "Yangilangan Type",
    type: Type,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(+id, updateTypeDto);
  }

  @ApiOperation({ summary: "Type'ni id'si orqali o'chirish" })
  @ApiNoContentResponse({
    description: "O'chirilgan Type id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Blcok successfully deleted" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.typesService.remove(+id);
  }
}
