// export class TeamspaceMembersController

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeamspaceMembersService } from "./teamspace_members.service";
import { CreateTeamspaceMemberDto } from "./dto/create-teamspace_member.dto";
import { UpdateTeamspaceMemberDto } from "./dto/update-teamspace_member.dto";

@Controller("teamspace-members")
export class TeamspaceMembersController {
  constructor(
    private readonly teamspaceMembersService: TeamspaceMembersService
  ) {}

  @Post()
  create(@Body() createTeamspaceMemberDto: CreateTeamspaceMemberDto) {
    return this.teamspaceMembersService.create(createTeamspaceMemberDto);
  }

  @Get()
  findAll() {
    return this.teamspaceMembersService.findAll();
  }

  @Get(":teamspace_id/:user_id")
  findOne(
    @Param("teamspace_id") teamspace_id: string,
    @Param("user_id") user_id: string
  ) {
    return this.teamspaceMembersService.findOne(+teamspace_id, +user_id);
  }

  @Patch(":teamspace_id/:user_id")
  update(
    @Param("teamspace_id") teamspace_id: string,
    @Param("user_id") user_id: string,
    @Body() updateTeamspaceMemberDto: UpdateTeamspaceMemberDto
  ) {
    return this.teamspaceMembersService.update(
      +teamspace_id,
      +user_id,
      updateTeamspaceMemberDto
    );
  }

  @Delete(":teamspace_id/:user_id")
  remove(
    @Param("teamspace_id") teamspace_id: string,
    @Param("user_id") user_id: string
  ) {
    return this.teamspaceMembersService.remove(+teamspace_id, +user_id);
  }
}
