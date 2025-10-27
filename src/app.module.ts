import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PcbModule } from './modules/integrations/python-api/pcb.module';
import { envConfig } from './shared/infrastructure/configs/env.config';

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
