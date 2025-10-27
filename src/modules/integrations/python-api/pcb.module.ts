import { Module } from '@nestjs/common';

import { PythonAnalyzerModule } from '@/modules/integrations/python-api/infrastructure/gateways/python-analyzer.module';
import { PcbUseCase } from './application/usecases/pcb.usecase';
import { PcbController } from './presentation/controllers/pcb.controller';

@Module({
  imports: [PythonAnalyzerModule],
  controllers: [PcbController],
  providers: [PcbUseCase],
})
export class PcbModule {}
