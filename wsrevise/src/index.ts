import express from 'express'
const app = express()

app.get("/hello" , (req , res)=>{
    res.status(200).json({
        message:"bhai server is running okayy"
    })
})

app.listen(3000 , ()=>{
    console.log("server is running")
})