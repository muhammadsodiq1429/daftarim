import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "../../users/models/user.model";
import { Teamspace } from "../../teamspace/models/teamspace.model";

interface ICreationTeamspaceMemberAttr {
  teamspace_id: number;
  user_id: number;
  is_member: boolean;
}

@Table({ tableName: "teamspace_member" })
export class TeamspaceMember extends Model<
  TeamspaceMember,
  ICreationTeamspaceMemberAttr
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => Teamspace)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare teamspace_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare user_id: number;

  @Column({ type: DataType.BOOLEAN })
  declare is_member: boolean;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Teamspace)
  declare teamspace: Teamspace;
}
