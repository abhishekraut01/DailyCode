import express from 'express'
const app = express()


app.get("/cpu", (req, res) => {
    let startTime = Date.now()
    let sum = 0
    for (let i = 0; i < 1000000000; i++) {
        sum += i
    }
    let endTime = Date.now()
    res.status(200).json({
        message: "success",
        data: `The time took to response is ${endTime - startTime}ms on route ${req.route}`
    })
})

app.listen(3000, () => {
    console.log(`server is listening at port 3000`)
})