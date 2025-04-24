import { Module } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { PropertyController } from "./property.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Property } from "./models/property.model";

@Module({
  imports: [SequelizeModule.forFeature([Property])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
