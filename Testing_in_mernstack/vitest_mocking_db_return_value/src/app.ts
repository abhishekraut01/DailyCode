import express from "express";
import { z } from 'zod'
import { prismaClient } from "../db/index.js";

export const app = express();
app.use(express.json());

// Zod Schema
const zodUserSchema = z.object({
    id: z.string(),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

// SIGNUP
app.post("/signup", async (req, res) => {
    const parsedData = zodUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const { id, username, email, password } = parsedData.data;

    // check if email already exists
    const existing = await prismaClient.user.findUnique({
        where: { email }
    });

    if (existing) {
        return res.status(409).json({ message: "User already exists" });
    }

    const user = await prismaClient.user.create({
        data: { id, username, email, password }
    });

    return res.status(200).json({ message: "User created", user });
});


// SIGNIN
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const user = await prismaClient.user.findUnique({
        where: { email }
    });

    if (!user || user.password !== password) {
        return res.status(403).json({ message: "Invalid credentials" });
    }

    // pretend this is JWT token but its just user.id for simplicity
    return res.status(200).json({ message: "Logged in", token: user.id });
});


// PROFILE (Using `token` header)
app.get("/profile", async (req, res) => {
    const token = req.headers.token;

    if (!token || typeof token !== "string") {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await prismaClient.user.findUnique({
        where: { id: token }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
    });
});
