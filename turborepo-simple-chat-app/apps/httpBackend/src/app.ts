import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Import and use routes
import authRoute from './routes/auth.routes.js';
import errorHandler from './middlewares/globalErrorHandler.js';
app.use('/api/v1/auth', authRoute);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.use(errorHandler)

export default app;