import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Group } from "../../groups/models/group.model";
import { User } from "../../users/models/user.model";

interface ICreationGroupMemberAttr {
  group_id: number;
  user_id: number;
}

@Table({ tableName: "group_member" })
export class GroupMember extends Model<GroupMember, ICreationGroupMemberAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  group_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Group)
  group: Group;
}
