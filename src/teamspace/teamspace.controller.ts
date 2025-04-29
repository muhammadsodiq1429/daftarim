import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { TeamspacesService } from "./teamspace.service";
import { CreateTeamspaceDto } from "./dto/create-teamspace.dto";
import { UpdateTeamspaceDto } from "./dto/update-teamspace.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("teamspace")
export class TeamspaceController {
  constructor(private readonly teamspaceService: TeamspacesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("icon"))
  create(
    @Body() createTeamspaceDto: CreateTeamspaceDto,
    @UploadedFile() icon: any
  ) {

    return this.teamspaceService.create(createTeamspaceDto, icon);
  }

  @Get()
  findAll() {
    return this.teamspaceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teamspaceService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeamspaceDto: UpdateTeamspaceDto
  ) {
    return this.teamspaceService.update(+id, updateTeamspaceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teamspaceService.remove(+id);
  }
}
