import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from "@repo/utils/apiError";

interface TokenPayload {
  sub: string; // userId
  iat?: number;
  exp?: number;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) =>{
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Token not found');
    }

    const secretKey = process.env.JWT_ACCESS_SECRET;

    if (!secretKey) {
      throw new ApiError(
        500,
        'Server misconfiguration: Access token secret is missing.'
      );
    }
    const decoded = jwt.verify(token, secretKey) as TokenPayload;
    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    next(error);
  }
};