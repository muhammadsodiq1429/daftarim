import { PartialType } from '@nestjs/swagger';
import { CreateBlockPropertyDto } from './create-block_property.dto';

export class UpdateBlockPropertyDto extends PartialType(CreateBlockPropertyDto) {}
