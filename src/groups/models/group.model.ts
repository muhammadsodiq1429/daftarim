import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface ICreationGroupAttr {
  name: string;
  icon?: string;
  description?: string;
  created_by: number;
}

@Table({ tableName: "group" })
export class Group extends Model<Group, ICreationGroupAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare icon: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare created_by: number;

  @BelongsTo(() => User)
  declare user: User;
}
