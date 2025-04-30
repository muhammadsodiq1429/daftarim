import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkspaceMemberDto } from "./dto/create-workspace_member.dto";
import { UpdateWorkspaceMemberDto } from "./dto/update-workspace_member.dto";
import { WorkspaceMember } from "./models/workspace_member.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class WorkspaceMembersService {
  constructor(
    @InjectModel(WorkspaceMember)
    private workspaceMemberModel: typeof WorkspaceMember
  ) {}
  async create(createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    const newWorkspaceMember = await this.workspaceMemberModel.create(
      createWorkspaceMemberDto
    );

    return newWorkspaceMember;
  }

  async findAll() {
    const allWorkspaceMember = await this.workspaceMemberModel.findAll({
      include: { all: true },
    });
    if (allWorkspaceMember.length === 0)
      throw new NotFoundException("WorkspaceMember not found");

    return allWorkspaceMember;
  }

  async findOne(workspace_id: number, user_id: number) {
    const workspaceMember = await this.workspaceMemberModel.findOne({
      where: { workspace_id, user_id },
      include: { all: true },
    });
    if (!workspaceMember)
      throw new NotFoundException("WorkspaceMember not found");

    return workspaceMember;
  }

  async update(
    workspace_id: number,
    user_id: number,
    updateWorkspaceMemberDto: UpdateWorkspaceMemberDto
  ) {
    const workspaceMember = await this.findOne(workspace_id, user_id);

    await workspaceMember.update(updateWorkspaceMemberDto);

    return { message: "WorkspaceMember successfully updated", workspaceMember };
  }

  async remove(workspace_id: number, user_id: number) {
    const workspaceMember = await this.findOne(workspace_id, user_id);

    await workspaceMember.destroy();

    return {
      message: "WorkspaceMember successfully deleted",
      workspace_id,
      user_id,
    };
  }
}
