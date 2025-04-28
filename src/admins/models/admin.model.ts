import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationAdminAttr {
  full_name: string;
  email: string;
  password: string;
  role_id: number;
  is_active: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, ICreationAdminAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Column({ type: DataType.INTEGER })
  declare role_id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;
}
