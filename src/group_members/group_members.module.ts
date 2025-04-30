import { Module } from "@nestjs/common";
import { GroupMembersService } from "./group_members.service";
import { GroupMembersController } from "./group_members.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { GroupMember } from "./models/group_member.model";

@Module({
  imports: [SequelizeModule.forFeature([GroupMember])],
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
})
export class GroupMembersModule {}
