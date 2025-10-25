import { Module } from '@nestjs/common';

import { PythonAnalyzerModule } from 'src/infrastructure/gateways/python-analyzer.module';
import { PcbController } from './controllers/pcb.controller';
import { PcbUseCase } from './usecases/pcb.usecase';

@Module({
  imports: [PythonAnalyzerModule],
  controllers: [PcbController],
  providers: [PcbUseCase],
})
export class PcbModule {}
