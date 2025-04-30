import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface ICreationCommentAttr {
  content: string;
  user_id: number;
  block_id: number;
  is_edited: boolean;
}

@Table({ tableName: "comments" })
export class Comment extends Model<Comment, ICreationCommentAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare content: string;

  @Column({ type: DataType.INTEGER })
  declare user_id: number;

  @Column({ type: DataType.INTEGER })
  declare block_id: number;

  @Column({ type: DataType.BOOLEAN })
  declare is_edited: boolean;
}
