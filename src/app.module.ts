import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './infra/configs/env.config';
import { MongodbOptions } from './infra/database/mongo/mongodb.config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ServiceOrderModule } from './modules/serviceOrder/service.order.module';
import { UserModule } from './modules/users/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoOptions = new MongodbOptions(configService);
        return await mongoOptions.getOptions();
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    ServiceOrderModule,
    AuthModule
  ],
})
export class AppModule { }
