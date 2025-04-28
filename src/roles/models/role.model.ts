import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "../../admins/models/admin.model";

interface ICreationRoleAttr {
  name: string;
  description: string;
}

@Table({ tableName: "role" })
export class Role extends Model<Role, ICreationRoleAttr> {
  @ApiProperty({ example: 1, description: "Role uchun takrorlanmas id" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "admin",
    description: "Role'ning nomi",
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    example: "Adminjon",
    description: "Role'ning izohi",
    required: false,
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @HasMany(() => Admin)
  admins: Admin[];
}
