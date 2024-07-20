import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class NotFoundError extends CustomAPIError {
  constructor(message: string, statusCode: number = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

export default NotFoundError;
