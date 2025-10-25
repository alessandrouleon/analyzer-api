export interface DomainErrorProps {
  message: string;
  context: string;
}

export class DomainError extends Error {
  constructor(public errors: DomainErrorProps[]) {
    super(
      errors.map((error) => `${error.context}: ${error.message}`).join(','),
    );
  }
}
