import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './infra/configs/env.config';
import { MongodbOptions } from './infra/database/mongo/mongodb.config';

import { AuthModule } from './modules/auth/auth.module';
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
    UserModule,
    AuthModule
  ],
})
export class AppModule { }
