import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Workspace } from "../../workspace/models/workspace.model";
import { User } from "../../users/models/user.model";

interface ICreationWorkspaceMemberAttr {
  workspace_id: number;
  user_id: number;
  is_admin: boolean;
}

@Table({ tableName: "workspace_member" })
export class WorkspaceMember extends Model<
  WorkspaceMember,
  ICreationWorkspaceMemberAttr
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => Workspace)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare workspace_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare user_id: number;

  @Column({ type: DataType.BOOLEAN })
  declare is_admin: boolean;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Workspace)
  declare workspace: Workspace;
}
