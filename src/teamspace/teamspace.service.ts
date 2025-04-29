import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeamspaceDto } from "./dto/create-teamspace.dto";
import { UpdateTeamspaceDto } from "./dto/update-teamspace.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Teamspace } from "./models/teamspace.model";
import { FileService } from "../file/file.service";

@Injectable()
export class TeamspacesService {
  constructor(
    @InjectModel(Teamspace) private readonly teamspaceModel: typeof Teamspace,
    private readonly fileService: FileService
  ) {}

  async create(createTeamspaceDto: CreateTeamspaceDto, icon: any) {
    if (icon) createTeamspaceDto.icon = await this.fileService.saveFile(icon);
    const newTeamspace = await this.teamspaceModel.create(createTeamspaceDto);

    return newTeamspace;
  }

  async findAll() {
    const allTeamspace = await this.teamspaceModel.findAll({
      include: { all: true },
    });

    if (allTeamspace.length === 0)
      throw new NotFoundException("Teamspace not found");

    return allTeamspace;
  }

  async findOne(id: number) {
    const teamspace = await this.teamspaceModel.findByPk(id, {
      include: { all: true },
    });

    if (!teamspace) throw new NotFoundException("Teamspace not found");

    return teamspace;
  }

  async update(id: number, updateTeamspaceDto: UpdateTeamspaceDto) {
    const teamspace = await this.findOne(id);

    await teamspace.update(updateTeamspaceDto);

    return {
      message: "Teamspace successfully updated",
      updatedTeamspace: teamspace,
    };
  }

  async remove(id: number) {
    const teamspace = await this.findOne(id);
    await teamspace.destroy();

    return {
      message: "Teamspace successfully deleted",
      id,
    };
  }
}
