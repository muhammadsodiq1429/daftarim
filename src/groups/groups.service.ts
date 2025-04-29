import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Group } from "./models/group.model";
import { FileService } from "../file/file.service";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private readonly groupModel: typeof Group,
    private readonly fileService: FileService
  ) {}

  async create(createGroupDto: CreateGroupDto, icon: any) {
    if (icon)
      createGroupDto.icon = await this.fileService.saveFile(icon);
    const newGroup = await this.groupModel.create(createGroupDto);

    return newGroup;
  }

  async findAll() {
    const allGroup = await this.groupModel.findAll({
      include: { all: true },
    });

    if (allGroup.length === 0) throw new NotFoundException("Group not found");

    return allGroup;
  }

  async findOne(id: number) {
    const group = await this.groupModel.findByPk(id, {
      include: { all: true },
    });

    if (!group) throw new NotFoundException("Group not found");

    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);

    await group.update(updateGroupDto);

    return {
      message: "Group successfully updated",
      updatedGroup: group,
    };
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    await group.destroy();

    return {
      message: "Group successfully deleted",
      id,
    };
  }
}
