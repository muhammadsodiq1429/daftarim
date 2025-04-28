import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { BlockPropertiesService } from "./block_properties.service";
import { CreateBlockPropertyDto } from "./dto/create-block_property.dto";
import { UpdateBlockPropertyDto } from "./dto/update-block_property.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BlockProperty } from "./models/block_property.model";
@Controller("block-properties")
export class BlockPropertiesController {
  constructor(
    private readonly blockPropertiesService: BlockPropertiesService
  ) {}

  @ApiOperation({ summary: "Yangi block property qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan block property ma'lumotlari",
    type: BlockProperty,
  })
  @Post()
  create(@Body() createBlockPropertyDto: CreateBlockPropertyDto) {
    return this.blockPropertiesService.create(createBlockPropertyDto);
  }

  @ApiOperation({ summary: "Block property ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Block property ro'yxati",
    type: [BlockProperty],
  })
  @Get()
  findAll() {
    return this.blockPropertiesService.findAll();
  }

  @ApiOperation({ summary: "Block property'ni id'si orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Bitta block property",
    type: BlockProperty,
  })
  @Get(":blockId/:propertyId")
  findOne(
    @Param("blockId", ParseIntPipe) blockId: number,
    @Param("propertyId", ParseIntPipe) propertyId: number
  ) {
    return this.blockPropertiesService.findOne(blockId, propertyId);
  }

  @ApiOperation({ summary: "Block property'ni id'si orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan block property",
    type: BlockProperty,
  })
  @Patch(":blockId/:propertyId")
  update(
    @Param("blockId", ParseIntPipe) blockId: number,
    @Param("propertyId", ParseIntPipe) propertyId: number,
    @Body() updateBlockPropertyDto: UpdateBlockPropertyDto
  ) {
    return this.blockPropertiesService.update(
      blockId,
      propertyId,
      updateBlockPropertyDto
    );
  }

  @ApiOperation({ summary: "Block property'ni id'si orqali o'chirish" })
  @ApiResponse({
    status: 204,
    description: "O'chirilgan block property id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Blcok successfully deleted" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Delete(":blockId/:propertyId")
  remove(
    @Param("blockId", ParseIntPipe) blockId: number,
    @Param("propertyId", ParseIntPipe) propertyId: number
  ) {
    return this.blockPropertiesService.remove(blockId, propertyId);
  }
}
