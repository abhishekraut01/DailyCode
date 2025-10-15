import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Client } from 'pg'

const app = express()
app.use(express.json())

const pgClient = new Client({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "sweabhishek",
    database: "postgres"
})


await pgClient.connect()

app.post('/login', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) { // Fixed the validation logic to check if ANY are missing
        return res.status(400).json({
            success: false,
            message: "username, email, and password required",
        })
    }

    // ⚠️ THIS IS THE INSECURE FIX: Adding single quotes around variables
    const newUser = await pgClient.query(`INSERT INTO EMPLOYEE (username , email , password) VALUES('${username}' , '${email}' , '${password}');`)
    
    res.status(200).json({
        success: true,
        message: "user created successfully",
        data: {
            user:newUser
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is walking on port ${process.env.PORT}`)
})