import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { WorkspaceMembersService } from "./workspace_members.service";
import { CreateWorkspaceMemberDto } from "./dto/create-workspace_member.dto";
import { UpdateWorkspaceMemberDto } from "./dto/update-workspace_member.dto";

@Controller("workspace-members")
export class WorkspaceMembersController {
  constructor(
    private readonly workspaceMembersService: WorkspaceMembersService
  ) {}

  @Post()
  create(@Body() createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    return this.workspaceMembersService.create(createWorkspaceMemberDto);
  }

  @Get()
  findAll() {
    return this.workspaceMembersService.findAll();
  }

  @Get(":workspace_id/:user_id")
  findOne(
    @Param("workspace_id") workspace_id: string,
    @Param("user_id") user_id: string
  ) {
    return this.workspaceMembersService.findOne(+workspace_id, +user_id);
  }

  @Patch(":workspace_id/:user_id")
  update(
    @Param("workspace_id") workspace_id: string,
    @Param("user_id") user_id: string,
    @Body() updateWorkspaceMemberDto: UpdateWorkspaceMemberDto
  ) {
    return this.workspaceMembersService.update(
      +workspace_id,
      +user_id,
      updateWorkspaceMemberDto
    );
  }

  @Delete(":workspace_id/:user_id")
  remove(
    @Param("workspace_id") workspace_id: string,
    @Param("user_id") user_id: string
  ) {
    return this.workspaceMembersService.remove(+workspace_id, +user_id);
  }
}
