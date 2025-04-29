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
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { AdminsModule } from "./admins/admins.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/models/role.model";
import { Admin } from "./admins/models/admin.model";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { WorkspaceModule } from "./workspace/workspace.module";
import { Workspace } from "./workspace/models/workspace.model";
import { GroupsModule } from "./groups/groups.module";
import { Group } from "./groups/models/group.model";
import { PermissionsModule } from "./permissions/permissions.module";
import { Permission } from "./permissions/models/permission.model";
import { TeamspaceModule } from "./teamspace/teamspace.module";
import { Teamspace } from "./teamspace/models/teamspace.model";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Type,
        Property,
        Block,
        BlockProperty,
        User,
        Role,
        Admin,
        Workspace,
        Group,
        Permission,
        Teamspace,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    BlocksModule,
    TypesModule,
    PropertyModule,
    BlockPropertiesModule,
    UsersModule,
    AuthModule,
    AdminsModule,
    RolesModule,
    FileModule,
    WorkspaceModule,
    GroupsModule,
    PermissionsModule,
    TeamspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
