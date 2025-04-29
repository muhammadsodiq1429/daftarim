import { Module } from "@nestjs/common";
import { TeamspacesService } from "./teamspace.service";
import { TeamspaceController } from "./teamspace.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Teamspace } from "./models/teamspace.model";
import { FileModule } from "../file/file.module";

@Module({
  imports: [SequelizeModule.forFeature([Teamspace]), FileModule],
  controllers: [TeamspaceController],
  providers: [TeamspacesService],
})
export class TeamspaceModule {}
