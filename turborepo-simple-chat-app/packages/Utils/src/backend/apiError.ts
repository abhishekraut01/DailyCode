export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any[];
  public isOperational: boolean;

  constructor(
    statusCode: number = 500,
    message: string = 'Internal server Error',
    errors: any[] = [],
    stack: string = ''
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.isOperational = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}