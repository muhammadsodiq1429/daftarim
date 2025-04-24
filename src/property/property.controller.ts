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

@Controller("property")
export class PropertyController {
  constructor(private readonly typeService: PropertyService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.typeService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.typeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.typeService.update(+id, updatePropertyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.typeService.remove(+id);
  }
}
