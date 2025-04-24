import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BlockPropertiesService } from "./block_properties.service";
import { CreateBlockPropertyDto } from "./dto/create-block_property.dto";
import { UpdateBlockPropertyDto } from "./dto/update-block_property.dto";
@Controller("block-properties")
export class BlockPropertiesController {
  constructor(
    private readonly blockPropertiesService: BlockPropertiesService
  ) {}

  @Post()
  create(@Body() createBlockPropertyDto: CreateBlockPropertyDto) {
    return this.blockPropertiesService.create(createBlockPropertyDto);
  }

  @Get()
  findAll() {
    return this.blockPropertiesService.findAll();
  }

  @Get(":blockId/:propertyId")
  findOne(
    @Param("blockId") blockId: string,
    @Param("propertyId") propertyId: string
  ) {
    return this.blockPropertiesService.findOne(+blockId, +propertyId);
  }

  @Patch(":blockId/:propertyId")
  update(
    @Param("blockId") blockId: string,
    @Param("propertyId") propertyId: string,
    @Body() updateBlockPropertyDto: UpdateBlockPropertyDto
  ) {
    return this.blockPropertiesService.update(
      +blockId,
      +propertyId,
      updateBlockPropertyDto
    );
  }

  @Delete(":blockId/:propertyId")
  remove(
    @Param("blockId") blockId: string,
    @Param("propertyId") propertyId: string
  ) {
    return this.blockPropertiesService.remove(+blockId, +propertyId);
  }
}
