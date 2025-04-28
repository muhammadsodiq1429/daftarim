import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Block } from "../../blocks/models/block.model";
import { Property } from "../../property/models/property.model";
import { ApiProperty } from "@nestjs/swagger";

interface IBlockPropertyAttr {
  blockId: number;
  propertyId: number;
  value: string;
}

@Table({ tableName: "block_property" })
export class BlockProperty extends Model<BlockProperty, IBlockPropertyAttr> {
  @ApiProperty({ example: 1, description: "Block id", required: true })
  @ForeignKey(() => Block)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare blockId: number;

  @ApiProperty({ example: 1, description: "Property id", required: true })
  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare propertyId: number;

  @ApiProperty({
    example: "Assalamu alaykum",
    description:
      "Aytaylik 1 id'li block'ning type text, 2'idli property'ning nomi content. \
    Shu block'idni blockId'ga property'idni propertyId'ga yozamiz va value'siga text'ning content'ini yozamiz",
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare value: string;
  @ApiProperty({ type: () => Block })
  @BelongsTo(() => Block)
  declare block: Block;
  
  @ApiProperty({ type: () => Property })
  @BelongsTo(() => Property)
  declare property: Property;
}
