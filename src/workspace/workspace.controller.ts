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
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @UseInterceptors(FileInterceptor("icon"))
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @UploadedFile() icon: any
  ) {
    return this.workspaceService.create(createWorkspaceDto, icon);
  }

  @Get()
  findAll() {
    return this.workspaceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workspaceService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto
  ) {
    return this.workspaceService.update(+id, updateWorkspaceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workspaceService.remove(+id);
  }
}
