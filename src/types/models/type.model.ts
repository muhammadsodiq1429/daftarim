import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Block } from "../../blocks/models/block.model";

interface ICreationTypeAttr {
  name: string;
  description: string;
}

@Table({ tableName: "types" })
export class Type extends Model<Type, ICreationTypeAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @HasMany(() => Block)
  declare blocks: Block[];
}
