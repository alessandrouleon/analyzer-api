import { Module } from '@nestjs/common';

import { PcbController } from './application/controllers/pcb.controller';
import { PythonAnalyzerModule } from './application/gateways/python-analyzer.module';
import { PcbUseCase } from './application/usecases/pcb.usecase';

@Module({
  imports: [PythonAnalyzerModule],
  controllers: [PcbController],
  providers: [PcbUseCase],
})
export class PcbModule {}
