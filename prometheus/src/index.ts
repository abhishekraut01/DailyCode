import express from 'express'
import { reqCountMiddleware } from './middleware.js'
import client from "prom-client";

const app = express()
app.use(reqCountMiddleware)

app.get("/cpu", (req, res) => {
    let sum = 0
    for (let i = 0; i < 10000000; i++) {
        sum += i
    }
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