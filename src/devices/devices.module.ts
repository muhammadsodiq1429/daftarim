import { Module } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { DevicesController } from "./devices.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Device } from "./models/device.model";

@Module({
  imports: [SequelizeModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
