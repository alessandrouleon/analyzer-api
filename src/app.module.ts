import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './infra/configs/env.config';
import { PcbModule } from './infra/integrations/python-api/pcb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    PcbModule,
  ],
})
export class AppModule {}
