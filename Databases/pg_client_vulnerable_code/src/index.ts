import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Client } from 'pg'

const app = express()
app.use(express.json())

const pgClient = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.DB_PORT as unknown as number ?? 5432,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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

    try {
        // ⚠️ THIS IS THE INSECURE FIX: Adding single quotes around variables
        const newUser = await pgClient.query(`INSERT INTO EMPLOYEE (username , email , password) VALUES('${username}' , '${email}' , '${password}');`)

        res.status(200).json({
            success: true,
            message: "user created successfully",
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error instanceof Error ? error.message : String(error),
        })
    }
})

app.get('/getUsers', async (req, res) => {

    const response = await pgClient.query(`SELECT * FROM EMPLOYEE;`)
    let userData = response.rows
    res.status(200).json({
        success: true,
        message: "user created successfully",
        data: {
            user: userData
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is walking on port ${process.env.PORT}`)
})