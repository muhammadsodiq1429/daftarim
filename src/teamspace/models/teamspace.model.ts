import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Workspace } from "../../workspace/models/workspace.model";
import { Permission } from "../../permissions/models/permission.model";

interface ICreationTeamspaceAttr {
  name: string;
  icon?: string;
  description?: string;
  workspace_id: number;
  created_by: number;
  permission_id: number;
}

@Table({ tableName: "teamspace" })
export class Teamspace extends Model<Teamspace, ICreationTeamspaceAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ type: DataType.STRING })
  declare icon: string;

  @ForeignKey(() => Workspace)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare workspace_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare created_by: number;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare permission_id: number;

  @BelongsTo(() => Workspace)
  declare workspace: Workspace;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Permission)
  declare permission: Permission;
}
