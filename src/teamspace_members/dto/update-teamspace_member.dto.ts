import { PartialType } from '@nestjs/swagger';
import { CreateTeamspaceMemberDto } from './create-teamspace_member.dto';

export class UpdateTeamspaceMemberDto extends PartialType(CreateTeamspaceMemberDto) {}
