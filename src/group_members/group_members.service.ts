import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupMemberDto } from "./dto/create-group_member.dto";
import { UpdateGroupMemberDto } from "./dto/update-group_member.dto";
import { InjectModel } from "@nestjs/sequelize";
import { GroupMember } from "./models/group_member.model";

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectModel(GroupMember) private groupMemberModel: typeof GroupMember
  ) {}
  async create(createGroupMemberDto: CreateGroupMemberDto) {
    const newGroupMember =
      await this.groupMemberModel.create(createGroupMemberDto);

    return newGroupMember;
  }

  async findAll() {
    const allGroupMember = await this.groupMemberModel.findAll({
      include: { all: true },
    });
    if (allGroupMember.length === 0)
      throw new NotFoundException("GroupMember not found");

    return allGroupMember;
  }

  async findOne(group_id: number, user_id: number) {
    const groupMember = await this.groupMemberModel.findOne({
      where: { group_id, user_id },
      include: { all: true },
    });
    if (!groupMember) throw new NotFoundException("GroupMember not found");

    return groupMember;
  }

  async update(
    group_id: number,
    user_id: number,
    updateGroupMemberDto: UpdateGroupMemberDto
  ) {
    const groupMember = await this.findOne(group_id, user_id);

    await groupMember.update(updateGroupMemberDto);

    return { message: "GroupMember successfully updated", groupMember };
  }

  async remove(group_id: number, user_id: number) {
    const groupMember = await this.findOne(group_id, user_id);

    await groupMember.destroy();

    return { message: "GroupMember successfully deleted", group_id, user_id };
  }
}
