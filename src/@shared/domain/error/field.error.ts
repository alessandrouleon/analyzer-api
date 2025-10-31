export interface FieldErrorProps {
  errors: { field: string; errors: string[] }[];
  context: string;
}

export class FieldError extends Error {
  constructor(public errors: FieldErrorProps) {
    super(JSON.stringify(errors));
  }
}
