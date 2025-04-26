import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.findByEmail(createAdminDto.email);
    if (admin) throw new ConflictException("Email already exists");
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 10);
    const newAdmin = await this.adminModel.create(createAdminDto);

    return { message: "Admin successfully created", id: newAdmin.id };
  }

  async findAll() {
    const allAdmin = await this.adminModel.findAll({ include: { all: true } });
    if (allAdmin.length === 0) throw new NotFoundException("Admin not found");

    return allAdmin;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException("Admin not found");

    return admin;
  }

  findByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    if (updateAdminDto.email) {
      const condidant = await this.findByEmail(updateAdminDto.email);
      if (condidant) throw new ConflictException("Email already exists");
    }
    await admin.update(updateAdminDto);

    return { message: "Admin successfully updated", id };
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: "Admin successfully deleted", id };
  }
}
