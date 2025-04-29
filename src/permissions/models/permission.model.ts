import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationPermissionAttr {
  name: string;
  label?: string;
  description?: string;
}

@Table({ tableName: "permission" })
export class Permission extends Model<Permission, ICreationPermissionAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare label: string;

  @Column({ type: DataType.TEXT })
  declare description: string;
}
