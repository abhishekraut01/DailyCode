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
});


// Establish the connection once
(async () => {
    try {
        await pgClient.connect()
        console.log("PostgreSQL client connected successfully.")
    } catch (err) {
        console.error("Failed to connect to PostgreSQL:", err)
        // Exit or handle error appropriately
        process.exit(1)
    }
})()



app.post('/login', async (req, res) => {
    const { username, email, password } = req.body

    // 1. Improved Validation Check (use OR operator)
    if (!username || !email || !password) {
        return res.status(400).json({ // 400 Bad Request is better than 411
            success: false,
            message: "username, email, and password are required.",
        })
    }

    try {
        // 2. Hash the Password (Crucial Security Step)
        // const hashedPassword = await bcrypt.hash(password, 10);

        // 3. SECURE PARAMETERIZED QUERY (No SQL Injection)
        const queryText = 'INSERT INTO EMPLOYEE (username, email, password) VALUES($1, $2, $3) RETURNING id, username, email';
        // Note: For actual use, you'd insert the hashedPassword instead of the raw password
        const queryValues = [username, email, password]; 

        const result = await pgClient.query(queryText, queryValues);
        const newUser = result.rows[0];
        
        // 4. Send response
        res.status(201).json({ // 201 Created is often better for a successful POST
            success: true,
            message: "user created successfully",
            data: {
                // Return non-sensitive data
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch (error) {
        console.error("Database error during user creation:", error);
        // Handle common errors like duplicate username/email gracefully here
        res.status(500).json({
            success: false,
            message: "Failed to create user due to a server error.",
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


