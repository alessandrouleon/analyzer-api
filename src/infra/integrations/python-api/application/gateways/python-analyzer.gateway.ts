import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import { ImageParams, PythonAnalysisDto } from './python-analyzer.interface';

@Injectable()
export class PythonAnalyzerGateway {
  private readonly pythonServerUrl: string;
  private readonly timeout: number = 30000;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('pythonServerUrl');

    if (!url) {
      throw new Error('PYTHON_SERVER_URL não está configurada no arquivo .env');
    }

    this.pythonServerUrl = url;
  }

  /**
   * Envia imagem para análise no servidor Python
   */
  async analyzeImage(params: ImageParams): Promise<PythonAnalysisDto> {
    const { filePath, filename } = params;

    try {
      const formData = this.createFormData(filePath, filename);
      const response = await this.sendRequest(formData);

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Cria FormData com a imagem
   */
  private createFormData(filePath: string, filename: string): FormData {
    const formData = new FormData();
    const fileStream = fs.createReadStream(filePath);
    formData.append('file', fileStream, filename);

    return formData;
  }

  /**
   * Envia requisição HTTP para o servidor Python
   */
  private async sendRequest(
    formData: FormData,
  ): Promise<AxiosResponse<PythonAnalysisDto>> {
    const response: AxiosResponse<PythonAnalysisDto> =
      await axios.post<PythonAnalysisDto>(this.pythonServerUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: this.timeout,
      });

    return response;
  }

  /**
   * Trata erros da integração
   */
  private handleError(error: unknown): never {
    if (axios.isAxiosError<PythonAnalysisDto>(error)) {
      const axiosError: AxiosError<PythonAnalysisDto> = error;
      const errorData = axiosError.response?.data;
      const errorStatus = axiosError.response?.status;

      throw new HttpException(
        {
          message: 'Erro ao processar imagem no servidor Python',
          erro: errorData ?? axiosError.message,
          details: {
            status: errorStatus,
            url: this.pythonServerUrl,
          },
        },
        errorStatus ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException(
      {
        message: 'Erro desconhecido ao comunicar com servidor Python',
        erro: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
