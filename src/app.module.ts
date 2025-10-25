import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './configs/env.config';
import { PcbModule } from './modules/pci/pcb.module';

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
