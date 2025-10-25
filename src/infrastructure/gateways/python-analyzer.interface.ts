export interface PythonAnalysisDto {
  falhas?: Array<{
    descricao: string;
    x: number;
    y: number;
    severidade: 'baixa' | 'média' | 'alta';
  }>;
  resumo?: string;
  result?: string;
  error?: string;
}

export interface ImageParams {
  filePath: string;
  filename: string;
}
