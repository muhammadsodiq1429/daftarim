import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Type } from "./models/type.model";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type) private typeModel: typeof Type) {}

  async create(createTypeDto: CreateTypeDto) {
    const type = await this.typeModel.findOne({
      where: { name: createTypeDto.name },
    });
    if (type) throw new ConflictException(`Type already exists`);
    const newType = await this.typeModel.create(createTypeDto);
    return { message: "Type successfully created", newType };
  }

  async findAll() {
    const allType = await this.typeModel.findAll({ include: { all: true } });
    if (allType.length === 0) throw new NotFoundException("Type not found");

    return allType;
  }

  async findOne(id: number) {
    const type = await this.typeModel.findByPk(id, { include: { all: true } });
    if (!type) throw new NotFoundException("Type not found");

    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const type = await this.findOne(id);
    const duplicate = await this.typeModel.findOne({
      where: { name: updateTypeDto.name },
    });
    if (duplicate && duplicate.id !== id) {
      throw new ConflictException(`${updateTypeDto.name} already exists`);
    }

    await type.update(updateTypeDto);
    return { message: "Type successfully updated", updatedType: type };
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    await type.destroy();

    return { message: "Type successfully deleted", id };
  }
}
