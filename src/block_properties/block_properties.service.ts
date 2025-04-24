import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBlockPropertyDto } from "./dto/create-block_property.dto";
import { UpdateBlockPropertyDto } from "./dto/update-block_property.dto";
import { InjectModel } from "@nestjs/sequelize";
import { BlockProperty } from "./models/block_property.model";

@Injectable()
export class BlockPropertiesService {
  constructor(
    @InjectModel(BlockProperty) private blockPropertyModel: typeof BlockProperty
  ) {}

  async create(createBlockPropertyDto: CreateBlockPropertyDto) {
    const newBlockProperty = await this.blockPropertyModel.create(
      createBlockPropertyDto
    );

    return { message: "Type successfully created", newBlockProperty };
  }

  async findAll() {
    const allBlockProperty = await this.blockPropertyModel.findAll({
      include: { all: true },
    });
    if (allBlockProperty.length === 0)
      throw new NotFoundException({ message: "BlockProperty not found" });

    return allBlockProperty;
  }

  async findOne(blockId: number, propertyId: number) {
    const blockProperty = await this.blockPropertyModel.findOne({
      where: { blockId, propertyId },
    });
    if (!blockProperty)
      throw new NotFoundException({ message: "BlockProperty not found" });
    return blockProperty;
  }

  async update(
    blockId: number,
    propertyId: number,
    updateBlockPropertyDto: UpdateBlockPropertyDto
  ) {
    const blockProperty = await this.findOne(blockId, propertyId);
    await blockProperty.update(updateBlockPropertyDto);

    return {
      message: "BlockProperty successfully updated",
      updatedBlockProperty: blockProperty,
    };
  }

  async remove(blockId: number, propertyId: number) {
    const blockProperty = await this.findOne(blockId, propertyId);
    await blockProperty.destroy();

    return {
      message: "BlockProperty successfully deleted",
      blockId,
      propertyId,
    };
  }
}
