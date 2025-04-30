import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeamspaceMemberDto } from "./dto/create-teamspace_member.dto";
import { UpdateTeamspaceMemberDto } from "./dto/update-teamspace_member.dto";
import { InjectModel } from "@nestjs/sequelize";
import { TeamspaceMember } from "../teamspace_members/models/teamspace_member.model";

@Injectable()
export class TeamspaceMembersService {
  constructor(
    @InjectModel(TeamspaceMember)
    private teamspaceMemberModel: typeof TeamspaceMember
  ) {}
  async create(createTeamspaceMemberDto: CreateTeamspaceMemberDto) {
    const newTeamspaceMember = await this.teamspaceMemberModel.create(
      createTeamspaceMemberDto
    );

    return newTeamspaceMember;
  }

  async findAll() {
    const allTeamspaceMember = await this.teamspaceMemberModel.findAll({
      include: { all: true },
    });
    if (allTeamspaceMember.length === 0)
      throw new NotFoundException("TeamspaceMember not found");

    return allTeamspaceMember;
  }

  async findOne(teamspace_id: number, user_id: number) {
    const teamspaceMember = await this.teamspaceMemberModel.findOne({
      where: { teamspace_id, user_id },
      include: { all: true },
    });
    if (!teamspaceMember)
      throw new NotFoundException("TeamspaceMember not found");

    return teamspaceMember;
  }

  async update(
    teamspace_id: number,
    user_id: number,
    updateTeamspaceMemberDto: UpdateTeamspaceMemberDto
  ) {
    const teamspaceMember = await this.findOne(teamspace_id, user_id);

    await teamspaceMember.update(updateTeamspaceMemberDto);

    return { message: "TeamspaceMember successfully updated", teamspaceMember };
  }

  async remove(teamspace_id: number, user_id: number) {
    const teamspaceMember = await this.findOne(teamspace_id, user_id);

    await teamspaceMember.destroy();

    return {
      message: "TeamspaceMember successfully deleted",
      teamspace_id,
      user_id,
    };
  }
}
