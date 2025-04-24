import { Module } from "@nestjs/common";
import { BlockPropertiesService } from "./block_properties.service";
import { BlockPropertiesController } from "./block_properties.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { BlockProperty } from "./models/block_property.model";

@Module({
  imports: [SequelizeModule.forFeature([BlockProperty])],
  controllers: [BlockPropertiesController],
  providers: [BlockPropertiesService],
})
export class BlockPropertiesModule {}
