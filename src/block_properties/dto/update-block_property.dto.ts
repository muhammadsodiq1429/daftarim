import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockPropertyDto } from './create-block_property.dto';

export class UpdateBlockPropertyDto extends PartialType(CreateBlockPropertyDto) {}
