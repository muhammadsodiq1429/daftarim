import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GroupMembersService } from "./group_members.service";
import { CreateGroupMemberDto } from "./dto/create-group_member.dto";
import { UpdateGroupMemberDto } from "./dto/update-group_member.dto";

@Controller("group-members")
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get()
  findAll() {
    return this.groupMembersService.findAll();
  }

  @Get(":group_id/:user_id")
  findOne(
    @Param("group_id") group_id: string,
    @Param("user_id") user_id: string
  ) {
    return this.groupMembersService.findOne(+group_id, +user_id);
  }

  @Patch(":group_id/:user_id")
  update(
    @Param("group_id") group_id: string,
    @Param("user_id") user_id: string,
    @Body() updateGroupMemberDto: UpdateGroupMemberDto
  ) {
    return this.groupMembersService.update(
      +group_id,
      +user_id,
      updateGroupMemberDto
    );
  }

  @Delete(":id")
  remove(
    @Param("group_id") group_id: string,
    @Param("user_id") user_id: string
  ) {
    return this.groupMembersService.remove(+group_id, +user_id);
  }
}
