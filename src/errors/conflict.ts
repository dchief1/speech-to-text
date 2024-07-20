import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class ConflictError extends CustomAPIError {
  constructor(message: string, statusCodes: number = StatusCodes.CONFLICT) {
    super(message, statusCodes);
  }
}

export default ConflictError;
