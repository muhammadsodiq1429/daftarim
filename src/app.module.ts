import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { BlocksModule } from "./blocks/blocks.module";
import { TypesModule } from "./types/types.module";
import { PropertyModule } from "./property/property.module";
import { BlockPropertiesModule } from "./block_properties/block_properties.module";
import { Type } from "./types/models/type.model";
import { Property } from "./property/models/property.model";
import { Block } from "./blocks/models/block.model";
import { BlockProperty } from "./block_properties/models/block_property.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Type, Property, Block, BlockProperty],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    BlocksModule,
    TypesModule,
    PropertyModule,
    BlockPropertiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
