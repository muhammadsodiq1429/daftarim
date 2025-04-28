import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PropertyService } from "./property.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Property } from "./models/property.model";

@Controller("property")
export class PropertyController {
  constructor(private readonly typeService: PropertyService) {}

  @ApiOperation({ summary: "Yangi property qo'shish" })
  @ApiCreatedResponse({
    description: "Yangi qo'shilgan property ma'lumotlari",
    type: Property,
  })
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.typeService.create(createPropertyDto);
  }

  @ApiOperation({ summary: "Property ro'yxatini olish" })
  @ApiOkResponse({
    description: "Property ro'yxati",
    type: [Property],
  })
  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @ApiOperation({ summary: "Property'ni id'si orqali olish" })
  @ApiOkResponse({
    description: "Bitta property",
    type: Property,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.typeService.findOne(+id);
  }

  @ApiOperation({ summary: "Property'ni id'si orqali yangilash" })
  @ApiOkResponse({
    description: "Yangilangan property",
    type: Property,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.typeService.update(+id, updatePropertyDto);
  }

  @ApiOperation({ summary: "Property'ni id'si orqali o'chirish" })
  @ApiNoContentResponse({
    description: "O'chirilgan property id'si",
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
    return this.typeService.remove(+id);
  }
}
