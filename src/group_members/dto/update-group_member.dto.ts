import { PartialType } from '@nestjs/swagger';
import { CreateGroupMemberDto } from './create-group_member.dto';

export class UpdateGroupMemberDto extends PartialType(CreateGroupMemberDto) {}
