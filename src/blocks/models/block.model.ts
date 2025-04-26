import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Type } from "../../types/models/type.model";
import { Property } from "../../property/models/property.model";
import { BlockProperty } from "../../block_properties/models/block_property.model";
import { User } from "../../users/models/user.model";

interface ICreationBlockAttr {
  typeId: number;
  created_by: number;
  parent_block: number;
  order_index: number;
}

@Table({ tableName: "block" })
export class Block extends Model<Block, ICreationBlockAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare typeId: number;

  // @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare created_by: number;

  @ForeignKey(() => Block)
  @Column({ type: DataType.INTEGER })
  declare parent_block: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order_index: number;

  @BelongsTo(() => Type)
  declare type: Type;

  @HasMany(() => Block)
  declare blocks: Block[];

  @BelongsToMany(() => Property, () => BlockProperty)
  declare properties: Property[];

  // @BelongsTo(() => User)
  // declare user: User;
}
