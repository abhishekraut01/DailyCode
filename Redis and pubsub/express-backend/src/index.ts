import express from "express";
import  { createClient } from "redis";

const PORT = 4000;
const app = express();
const client = createClient();

app.use(express.json());

app.post("/submit", async (req, res) => {
  const { language, code, userid, problemId } = req.body;

  try {
    if (!language || !code || !userid || !problemId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    await client.lPush(
      "submission",
      JSON.stringify({ language, code, userid, problemId })
    );

    return res.status(200).json({
      message: "Submission successful",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message || "Internal server error",
      success: false,
    });
  }
});

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Express server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Redis connection failed:", err);
  });
