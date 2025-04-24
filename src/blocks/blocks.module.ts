import { Module } from "@nestjs/common";
import { BlocksService } from "./blocks.service";
import { BlocksController } from "./blocks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Block } from "./models/block.model";

@Module({
  imports: [SequelizeModule.forFeature([Block])],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
