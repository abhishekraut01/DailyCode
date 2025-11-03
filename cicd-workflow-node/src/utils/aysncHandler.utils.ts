import type { Request, Response, NextFunction } from "express";

/**
 * Wraps async route handlers and forwards errors to Express error middleware.
 * Eliminates repetitive try-catch blocks in controllers.
 */


export const AsyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}