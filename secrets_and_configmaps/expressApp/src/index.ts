import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("bro this is your home page");
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server chal raha hai bro",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});

