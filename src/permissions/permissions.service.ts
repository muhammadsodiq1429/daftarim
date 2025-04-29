import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Permission } from "./models/permission.model";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const newPermission =
      await this.permissionModel.create(createPermissionDto);

    return { message: "Permission successfully created", newPermission };
  }

  async findAll() {
    const allPermission = await this.permissionModel.findAll({
      include: { all: true },
    });
    if (allPermission.length === 0)
      throw new NotFoundException("Permission not found");

    return allPermission;
  }

  async findOne(id: number) {
    const permission = await this.permissionModel.findByPk(id, {
      include: { all: true },
    });
    if (!permission) throw new NotFoundException("Permission not found");

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    await permission.update(updatePermissionDto);

    return {
      message: "Permission successfully updated",
      updatedPermission: permission,
    };
  }

  async remove(id: number) {
    const permission = await this.findOne(id);
    await permission.destroy();

    return { message: "Permission successfully deleted", id };
  }
}
