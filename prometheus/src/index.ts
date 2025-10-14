import express from 'express'
import { reqCountMiddleware } from './middleware.js'
import client from "prom-client";

const app = express()
app.use(reqCountMiddleware)

app.get("/cpu", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json({
        message: "success",
    })
})

app.get("/user", (req, res) => {

    res.status(200).json({
        message: "",
        data: {
            name: "abhishek",
            role: "SDE2"
        }
    })
})

app.get("/matrix", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})


app.listen(3000, () => {
    console.log(`server is listening at port 3000`)
})