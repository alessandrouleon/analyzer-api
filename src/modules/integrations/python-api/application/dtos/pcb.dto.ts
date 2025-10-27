export interface AnalysisResponse {
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

export interface OutputPCI {
  success: boolean;
  analise: AnalysisResponse;
  arquivo: {
    filename: string;
    mimetype: string;
    size: number;
  };
}
