export interface DomainErrorProps {
  message: string;
  context: string;
}

export class DomainError extends Error {
  constructor(public errors: DomainErrorProps[]) {
    const cleanErrors = errors.map((error) => ({
      context: error.context,
      message: error.message.replace(/['"]+/g, ''), // remove aspas simples e duplas
    }));

    // Gera uma mensagem geral (para o .message do Error)
    const message = cleanErrors
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ');

    super(message);

    this.errors = cleanErrors;
  }
}
