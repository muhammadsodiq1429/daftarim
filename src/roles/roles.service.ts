import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private typeModel: typeof Role) {}

  async create(createPropertyDto: CreateRoleDto) {
    const type = await this.typeModel.findOne({
      where: { name: createPropertyDto.name },
    });
    if (type) throw new ConflictException(`Role already exists`);
    const newProperty = await this.typeModel.create(createPropertyDto);
    return { message: "Role successfully created", newProperty };
  }

  async findAll() {
    const allProperty = await this.typeModel.findAll({
      include: { all: true },
    });
    if (allProperty.length === 0) throw new NotFoundException("Role not found");

    return allProperty;
  }

  async findOne(id: number) {
    const type = await this.typeModel.findByPk(id);
    if (!type) throw new NotFoundException("Role not found");

    return type;
  }

  async update(id: number, updatePropertyDto: UpdateRoleDto) {
    const type = await this.findOne(id);
    const duplicate = await this.typeModel.findOne({
      where: { name: updatePropertyDto.name },
    });
    if (duplicate && duplicate.id !== id) {
      throw new ConflictException(`${updatePropertyDto.name} already exists`);
    }

    await type.update(updatePropertyDto);
    return { message: "Role successfully updated", updatedProperty: type };
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    await type.destroy();

    return { message: "Role successfully deleted", id };
  }
}
