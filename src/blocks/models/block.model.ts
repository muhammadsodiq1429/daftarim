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
import { ApiProperty } from "@nestjs/swagger";

interface ICreationBlockAttr {
  typeId: number;
  created_by: number;
  parent_block: number;
  order_index: number;
}

@Table({ tableName: "block" })
export class Block extends Model<Block, ICreationBlockAttr> {
  @ApiProperty({ example: 1, description: "Block uchun takrorlanmas id" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 1,
    description:
      "Block qanday type'da ekanini bilish uchun type table'sidangi type id",
  })
  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare typeId: number;

  @ApiProperty({
    example: 1,
    description:
      "Block kimga tegishli ekani bilish uchun users table'sidagi user id",
    required: true,
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare created_by: number;

  @ApiProperty({
    example: 1,
    description:
      "Block'ning otasi kim ekanini bilish uchun block table'sigadagi block id",
    required: false,
  })
  @ForeignKey(() => Block)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare parent_block: number | null;

  @ApiProperty({
    example: 1,
    description: "Block'ning joylashuvini aniqlash uchun",
    required: true,
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order_index: number;

  @ApiProperty({ type: () => Type })
  @BelongsTo(() => Type)
  declare type: Type;

  @ApiProperty({ type: () => Block, isArray: true })
  @HasMany(() => Block, { foreignKey: "parent_block" })
  declare blocks: Block[];

  @ApiProperty({ type: () => Property, isArray: true })
  @BelongsToMany(() => Property, () => BlockProperty)
  declare properties: Property[];

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, { foreignKey: "created_by" })
  declare user: User;
}
