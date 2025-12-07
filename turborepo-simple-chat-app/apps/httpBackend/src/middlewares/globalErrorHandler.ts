import {  ApiError } from "@repo/utils/apiError"
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle known operational errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
    });
  }

  console.error('Unexpected Error:', err);

  // Send generic fallback response
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Something went wrong! Please try again later.',
  });
};

export default errorHandler;