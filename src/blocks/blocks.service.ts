import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBlockDto } from "./dto/create-block.dto";
import { UpdateBlockDto } from "./dto/update-block.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Block } from "./models/block.model";

@Injectable()
export class BlocksService {
  constructor(@InjectModel(Block) private blockModel: typeof Block) {}

  async create(createBlockDto: CreateBlockDto) {
    if (createBlockDto.parent_block)
      await this.findOne(createBlockDto.parent_block);

    const newBlock = await this.blockModel.create(createBlockDto);

    return { message: "Block successfully created", newBlock };
  }

  async findAll() {
    const allBlock = await this.blockModel.findAll({ include: { all: true } });
    if (allBlock.length === 0) throw new NotFoundException("Block not found");

    return allBlock;
  }

  async findOne(id: number) {
    const block = await this.blockModel.findByPk(id, {
      include: { all: true },
    });
    if (!block) throw new NotFoundException("Block not found");

    return block;
  }

  async update(id: number, updateBlockDto: UpdateBlockDto) {
    const block = await this.findOne(id);
    const parent_block = updateBlockDto.parent_block;
    if (parent_block) {
      await this.findOne(parent_block);
      if (+id === +parent_block)
        throw new BadRequestException("Block cannot be its own parent_block");
    }

    await block.update(updateBlockDto);

    return { message: "Block successfully updated", updatedBlock: block };
  }

  async remove(id: number) {
    const block = await this.findOne(id);
    await block.destroy();

    return { message: "Block successfully deleted", id };
  }
}
