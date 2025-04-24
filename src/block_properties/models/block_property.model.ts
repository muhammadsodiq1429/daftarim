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

interface IBlockPropertyAttr {
  blockId: number;
  propertyId: number;
  value: string;
}

@Table({ tableName: "block_property" })
export class BlockProperty extends Model<BlockProperty, IBlockPropertyAttr> {
  @ForeignKey(() => Block)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare blockId: number;

  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare propertyId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare value: string;

  @BelongsTo(() => Block)
  declare block: Block;

  @BelongsTo(() => Property)
  declare property: Property;
}
