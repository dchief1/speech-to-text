export class ValidationError extends Error {
  httpStatusCode: number;
  errorCode?: number;
  constructor(message: string, errorCode?: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = "VALIDATION_ERROR";
    this.httpStatusCode = 400;
  }
}
