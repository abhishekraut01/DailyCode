export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any[];
  public isOperational: boolean;
  constructor(
    statusCode: number = 500,
    message: string = 'Internal server error',
    errors: any[] = [],
    stack: string = ''
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}