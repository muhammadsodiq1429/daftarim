import { ApiProperty } from "@nestjs/swagger";
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

  @ApiProperty({
    example: "Muhammad Sodiq",
    description: "Foydalanuvchi ismi",
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({
    example: "Muhammad Yusuf",
    description: "Foydalanuvchi otasi ismi",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare last_name: string;

  @ApiProperty({
    example: "muhammadsodiq@mail.uz",
    description: "Foydalanuvchi elektron manzili",
    uniqueItems: true,
    required: true,
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({
    example: "@Qwerty-123456",
    description: "Foydalanuvhi paroli, kuchli bo'lishi kerak",
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({
    example: "photo1.jpg",
    description: "Foydalanuvchi profili uchun rasm",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare photo: string;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5dXN1ZnNpcm9qaWRkaW5vdi41NTYyQGdtYWlsLmNvbSIsInJvbGVfaWQiOm51bGwsImlhdCI6MTc0NTc0OTg1MCwiZXhwIjoxNzQ1ODAzODUwfQ.dcvOcBduK4-HrDONb49eQh_bj1TTp3tPcoMS0FdVBrI",
    description: "Foydalanuvchi uchun refresh token, sign in vaqtida beriladi",
  })
  @Column({ type: DataType.STRING, defaultValue: "" })
  declare refresh_token: string;

  @ApiProperty({
    example: "d05482d9-c492-4f6b-94d8-73f9bf0f2a1a",
    description: "Ikki bosqichlik tekshiruv uchun",
  })
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;
}
