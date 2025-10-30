import express from "express";
import { z } from 'zod'
import { prismaClient } from "../db/index.js";

export const app = express();
app.use(express.json());

// Zod Schema
const zodUserSchema = z.object({
    id: z.string(),
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
});

// SIGNUP
app.post("/signup", async (req, res) => {
    const parsedData = zodUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const { id, username, email, password } = parsedData.data;

    // await prismaClient.user.findUnique({
    //     where: { email }
    // });

    // if (existing) {
    //     return res.status(409).json({ message: "User already exists" });
    // }

    // await prismaClient.user.create({
    //     data: { id, username, email, password }
    // });

    if (username === "abhishek_great") {
        return res.status(409).json({ message: "User already exists" });
    } else {
        return res.status(200).json({ message: "User created" });
    }


});
