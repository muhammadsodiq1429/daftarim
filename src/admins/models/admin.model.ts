import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../roles/models/role.model";

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

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  declare role_id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @BelongsTo(() => Role)
  role: Role;
}
