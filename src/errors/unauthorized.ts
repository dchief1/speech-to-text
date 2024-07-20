import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class UnauthorizedError extends CustomAPIError {
  constructor(message: string, statusCode: number = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

export default UnauthorizedError;
