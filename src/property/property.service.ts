import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Property } from "./models/property.model";

@Injectable()
export class PropertyService {
  constructor(@InjectModel(Property) private typeModel: typeof Property) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const type = await this.typeModel.findOne({
      where: { name: createPropertyDto.name },
    });
    if (type) throw new ConflictException(`Property already exists`);
    const newProperty = await this.typeModel.create(createPropertyDto);
    return { message: "Property successfully created", newProperty };
  }

  async findAll() {
    const allProperty = await this.typeModel.findAll({
      include: { all: true },
    });
    if (allProperty.length === 0)
      throw new NotFoundException("Property not found");

    return allProperty;
  }

  async findOne(id: number) {
    const type = await this.typeModel.findByPk(id);
    if (!type) throw new NotFoundException("Property not found");

    return type;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    const type = await this.findOne(id);
    const duplicate = await this.typeModel.findOne({
      where: { name: updatePropertyDto.name },
    });
    if (duplicate && duplicate.id !== id) {
      throw new ConflictException(`${updatePropertyDto.name} already exists`);
    }

    await type.update(updatePropertyDto);
    return { message: "Property successfully updated", updatedProperty: type };
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    await type.destroy();

    return { message: "Property successfully deleted", id };
  }
}
