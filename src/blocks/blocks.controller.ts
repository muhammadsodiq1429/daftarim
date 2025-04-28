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
import { BlocksService } from "./blocks.service";
import { CreateBlockDto } from "./dto/create-block.dto";
import { UpdateBlockDto } from "./dto/update-block.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Block } from "./models/block.model";

@Controller("blocks")
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @ApiOperation({ summary: "Yangi block qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan block ma'lumotlari",
    type: Block,
  })
  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @ApiOperation({ summary: "Block ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Block ro'yxati",
    type: [Block],
  })
  @Get()
  findAll() {
    return this.blocksService.findAll();
  }

  @ApiOperation({ summary: "Block'ni id'si orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Bitta block",
    type: Block,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.blocksService.findOne(id);
  }

  @ApiOperation({ summary: "Block'ni id'si orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan block",
    type: Block,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBlockDto: UpdateBlockDto
  ) {
    return this.blocksService.update(id, updateBlockDto);
  }

  @ApiOperation({ summary: "Block'ni id'si orqali o'chirish" })
  @ApiResponse({
    status: 204,
    description: "O'chirilgan block id'si",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Blcok successfully deleted" },
        id: { type: "integer", example: 1 },
      },
    },
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.blocksService.remove(id);
  }
}
