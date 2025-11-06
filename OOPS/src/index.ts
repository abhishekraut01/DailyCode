import type { Request, Response, NextFunction } from "express";
import express from "express";
import prisma from "./databases/index.js";
import { asyncHandler } from "./utils/asyncHandler.js";

const app = express();
app.use(express.json());


app.get('/', (req, res) => { 
    res.send("hello world")
})

app.get("/api/v1/users/:id", asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
    }

    const response = await prisma.findUnique({
        where: { id: userId },
    });

    if (!response) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }

    res.status(200).json({
        message: "Data fetched successfully",
        data: response,
    });
})
);

// ✅ Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("❌ Error:", err);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    });
});

// ✅ Server
app.listen(3000, () => {
    console.log("🚀 Server is running at http://localhost:3000");
});
