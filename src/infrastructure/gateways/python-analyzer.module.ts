import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PythonAnalyzerGateway } from './python-analyzer.gateway';

@Module({
  imports: [ConfigModule],
  providers: [PythonAnalyzerGateway],
  exports: [PythonAnalyzerGateway],
})
export class PythonAnalyzerModule {}
