import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Block } from "../../blocks/models/block.model";
import { ApiProperty } from "@nestjs/swagger";

interface ICreationTypeAttr {
  name: string;
  description: string;
}

@Table({ tableName: "types" })
export class Type extends Model<Type, ICreationTypeAttr> {
  @ApiProperty({ example: 1, description: "Type uchun takrorlanmas id" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "text",
    description: "Block uchun biron bir tur",
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    example: "Matnlar uchun block turi",
    description: "Turning tavsifi",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @HasMany(() => Block)
  declare blocks: Block[];
}
