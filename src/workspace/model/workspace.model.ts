import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface ICreationWorkspaceAttr {
  created_by: number;
  name: string;
  icon?: string;
  category: string; // "work" | "personal life" | "school";
  management: string; //"withteam" | "own";
}

@Table({ tableName: "workspace" })
export class Workspace extends Model<Workspace, ICreationWorkspaceAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare created_by: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare icon: string;

  @Column({ type: DataType.STRING /*ENUM("work", "personal life", "school")*/ })
  declare category: string; //"work" | "personal life" | "school";

  @Column({ type: DataType.STRING /*ENUM("withteam", "own")*/ })
  declare management: string; // "withteam" | "own";

  @BelongsTo(() => User)
  user: User;
}
