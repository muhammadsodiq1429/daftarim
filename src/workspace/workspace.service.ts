import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Workspace } from "./model/workspace.model";

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace) private workspaceModel: typeof Workspace
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const newWorkspace = await this.workspaceModel.create(createWorkspaceDto);

    return newWorkspace;
  }

  async findAll() {
    const allWorkspace = await this.workspaceModel.findAll({
      include: { all: true },
    });

    if (allWorkspace.length === 0)
      throw new NotFoundException("Workspace not found");

    return allWorkspace;
  }

  async findOne(id: number) {
    const workspace = await this.workspaceModel.findByPk(id, {
      include: { all: true },
    });

    if (!workspace) throw new NotFoundException("Workspace not found");

    return workspace;
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.findOne(id);
    await workspace.update(updateWorkspaceDto);

    return {
      message: "Workspace successfully updated",
      updatedWorkspace: workspace,
    };
  }

  async remove(id: number) {
    const workspace = await this.findOne(id);
    await workspace.destroy();

    return {
      message: "Workspace successfully deleted",
      id,
    };
  }
}
