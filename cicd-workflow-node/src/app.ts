import express, { type NextFunction, type Request, type Response } from "express"

const app = express()
app.use(express.json());

import userRouter from './routes/user.routes.js'


app.use("/api/v1/user", userRouter)

app.get("/health", (req, res) => {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  res.status(200).json({
    message: `server is up ${now}`
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


export default app