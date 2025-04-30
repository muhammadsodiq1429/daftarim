import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface ICreationDeviceAttr {
  user_id: number;
  name: string;
  last_active: Date;
  lacation: string;
  information: string;
}

@Table({ tableName: "devices" })
export class Device extends Model<Device, ICreationDeviceAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.DATE })
  declare last_active: Date;

  @Column({ type: DataType.STRING })
  declare lacation: string;

  @Column({ type: DataType.JSON })
  declare information: string;
}
