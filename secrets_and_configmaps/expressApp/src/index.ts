import express from "express";
import dotenv from "dotenv";

dotenv.config();     // ❗ correct method, not configure()

const app = express();  // ❗ spelling fix: express not expess

app.get('/', (req, res) => {
    res.send("bro this is your home page");
});

app.get('/health', (req, res) => {
    res.status(200).json({
        message: "server chal raha hai bro"
    });
});

const PORT = process.env.PORT || 5000;  // safety default

app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});

