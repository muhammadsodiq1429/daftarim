import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreationUserAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photo: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, ICreationUserAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @Column({ type: DataType.STRING })
  declare last_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING })
  declare photo: string;

  @Column({ type: DataType.STRING, defaultValue: "" })
  declare refresh_token: string;

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;
}
