import express from "express";
import { z } from 'zod'
import {prismaClient} from "../db/index.ts";


export const app = express();
app.use(express.json());

const zodSchemaForSum = z.object({
    a: z.number(),
    b: z.number()
})



app.post("/sum",async  (req, res) => {
    const parsedData = zodSchemaForSum.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const answer = parsedData.data.a + parsedData.data.b

    await prismaClient.sum.create({
        data: {
            a: parsedData.data.a,
            b: parsedData.data.b,
            result: answer
        }
    })

    res.json({
        answer
    })
});

app.get("/sum", (req, res) => {
    const parsedResponse = zodSchemaForSum.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })

    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json({
        answer
    })
});