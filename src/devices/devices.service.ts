import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Device } from "./models/device.model";

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device) private deviceModel: typeof Device) {}
  async create(createDeviceDto: CreateDeviceDto) {
    const newDevice = await this.deviceModel.create(createDeviceDto);

    return newDevice;
  }

  async findAll() {
    const allDevice = await this.deviceModel.findAll();
    if (allDevice.length === 0) throw new NotFoundException("Device not found");

    return allDevice;
  }

  async findOne(id: number) {
    const device = await this.deviceModel.findByPk(id);
    if (!device) throw new NotFoundException("Device not found");

    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOne(id);
    await device.update(updateDeviceDto);

    return { message: "Device successfully updated", device };
  }

  async remove(id: number) {
    const device = await this.findOne(id);
    await device.destroy();

    return { message: "Device successfully deleted", id };
  }
}
