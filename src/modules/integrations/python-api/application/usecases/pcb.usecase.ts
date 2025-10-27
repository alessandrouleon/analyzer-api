import { PythonAnalyzerGateway } from '@/modules/integrations/python-api/infrastructure/gateways/python-analyzer.gateway';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AnalysisResponse, OutputPCI } from '../dtos/pcb.dto';

@Injectable()
export class PcbUseCase {
  constructor(private readonly pythonAnalyzerGateway: PythonAnalyzerGateway) {}

  async analyzeImage(file: Express.Multer.File): Promise<OutputPCI> {
    this.validateFile(file);

    try {
      const analysisResult = await this.pythonAnalyzerGateway.analyzeImage({
        filePath: file.path,
        filename: file.filename,
      });

      this.cleanupFile(file.path);

      return this.buildResponse(file, analysisResult);
    } catch (error) {
      this.cleanupFile(file.path);
      throw error;
    }
  }

  private validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new HttpException(
        'Arquivo não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private cleanupFile(filePath: string): void {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  private buildResponse(
    file: Express.Multer.File,
    analysisResult: AnalysisResponse,
  ): OutputPCI {
    return {
      success: true,
      analise: analysisResult,
      arquivo: {
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      },
    };
  }
}
