import express from 'express'
import { reqCountMiddleware } from './middleware.js'
const app = express()



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

app.use(reqCountMiddleware)
app.listen(3000, () => {
    console.log(`server is listening at port 3000`)
})