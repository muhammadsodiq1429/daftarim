import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { BlockProperty } from "../../block_properties/models/block_property.model";
import { Block } from "../../blocks/models/block.model";
import { ApiProperty } from "@nestjs/swagger";

interface ICreationPropertyAttr {
  name: string;
  description: string;
}

@Table({ tableName: "property" })
export class Property extends Model<Property, ICreationPropertyAttr> {
  @ApiProperty({ example: 1, description: "Property uchun takrorlanmas id" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "content",
    description: "Property'ning nomi",
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    example: "Bu text'ning matni",
    description: "Property'ning izohi",
    required: false,
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @ApiProperty({ type: () => Block, isArray: true, required:false })
  @BelongsToMany(() => Block, () => BlockProperty)
  declare blocks: Block[];
}
