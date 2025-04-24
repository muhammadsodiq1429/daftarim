import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { BlockProperty } from "../../block_properties/models/block_property.model";
import { Block } from "../../blocks/models/block.model";

interface ICreationPropertyAttr {
  name: string;
  description: string;
}

@Table({ tableName: "property" })
export class Property extends Model<Property, ICreationPropertyAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @BelongsToMany(() => Block, () => BlockProperty)
  declare blocks: Block[];
}
