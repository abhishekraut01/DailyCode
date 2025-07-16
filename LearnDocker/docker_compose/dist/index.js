import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const port = 3000;
const prisma = new PrismaClient();
app.use(express.json());
// Endpoint to create a users
app.post("/user", async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: `Abhishek user no ${Math.floor(Math.random() * 1000)}`,
                email: `${Math.floor(Math.random() * 1000)}@prisma.io`,
                password: `passowrd${Math.floor(Math.random() * 1000)}`
            },
        });
        res.status(201).send({ message: "User created", user: newUser });
    }
    catch (err) {
        res.status(500).send({ message: "Error creating user", error: err });
    }
});
// Endpoint to fetch all users
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send({ message: "Error fetching users", error: err });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
