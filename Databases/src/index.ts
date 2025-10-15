import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {Client} from 'pg'

const app = express()
const pgClient = new Client({
    
})



app.post('/login', (req, res) => {
    res.status(200).json({
        success: true,
        message: "user created successfully",
        data: {
            
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is walking on port ${process.env.PORT}`)
})