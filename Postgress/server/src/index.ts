import express, { Application, Request, response, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";
const app: Application = express();

const pgClient = new Client(process.env.CONNECTION_STRING);

async function connectToDb() {
  await pgClient.connect();
}

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password_hash,
      area,
      state,
      country,
      pincode,
    } = req.body;

    await pgClient.query("BEGIN");

    const userResult = await pgClient.query(
      `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      [username, email, password_hash]
    );
    const user_id = userResult.rows[0].id;

    await pgClient.query(
      `INSERT INTO addresses (area, state, country, pincode, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [area, state, country, pincode, user_id]
    );

    await pgClient.query("COMMIT");

    res.status(200).json({
      message: "User signed up successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    await pgClient.query("ROLLBACK");

    res.status(500).json({
      message: "User signup failed",
      success: false,
    });
  }
});

app.get("/metadata", async (req: Request, res: Response) => {});

connectToDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is listening at port " + process.env.PORT);
  });
});
