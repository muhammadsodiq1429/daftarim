import { Module } from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceController } from "./workspace.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Workspace } from "./model/workspace.model";

@Module({
  imports: [SequelizeModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
