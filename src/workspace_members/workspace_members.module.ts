import { Module } from "@nestjs/common";
import { WorkspaceMembersService } from "./workspace_members.service";
import { WorkspaceMembersController } from "./workspace_members.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { WorkspaceMember } from "./models/workspace_member.model";

@Module({
  imports: [SequelizeModule.forFeature([WorkspaceMember])],
  controllers: [WorkspaceMembersController],
  providers: [WorkspaceMembersService],
})
export class WorkspaceMembersModule {}
