import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./models/group.model";
import { FileModule } from "../file/file.module";

@Module({
  imports: [SequelizeModule.forFeature([Group]), FileModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
