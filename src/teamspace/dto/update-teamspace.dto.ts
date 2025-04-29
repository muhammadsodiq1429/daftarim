import { PartialType } from '@nestjs/swagger';
import { CreateTeamspaceDto } from './create-teamspace.dto';

export class UpdateTeamspaceDto extends PartialType(CreateTeamspaceDto) {}
