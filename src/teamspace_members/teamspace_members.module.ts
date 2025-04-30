import { Module } from "@nestjs/common";
import { TeamspaceMembersService } from "./teamspace_members.service";
import { TeamspaceMembersController } from "./teamspace_members.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { TeamspaceMember } from "./models/teamspace_member.model";

@Module({
  imports: [SequelizeModule.forFeature([TeamspaceMember])],
  controllers: [TeamspaceMembersController],
  providers: [TeamspaceMembersService],
})
export class TeamspaceMembersModule {}
