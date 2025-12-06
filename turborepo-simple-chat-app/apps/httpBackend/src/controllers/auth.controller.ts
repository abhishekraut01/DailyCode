import { Request, Response } from "express";
import { userSignUpSchema } from "@repo/validation/validation"
import { AsyncHandler, ApiResponse, ApiError } from "@repo/utils/utils"
import { prisma } from "@repo/db/prisma";
import { createSession } from "../services/createSession.js";
import bcrypt from "bcrypt";


export const handleSignup = AsyncHandler(async (req, res) => {
    // 1. Validate Input
    const { success, data, error } = userSignUpSchema.safeParse(req.body);
    if (!success) {
        throw new ApiError(400, "Invalid User Input Schema", error.issues);
    }

    const { email, username, password } = data;

    // 2. Check if user exists
    const [emailExists, usernameExists] = await Promise.all([
        prisma.users.findUnique({ where: { email }, select: { id: true } }),
        prisma.users.findUnique({ where: { username }, select: { id: true } })
    ]);

    if (emailExists || usernameExists) {
        throw new ApiError(409, "User already exists");
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create User (use transaction for safety)
    const newUser = await prisma.$transaction(async (tx) => {
        return tx.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
    });

    // 5. Get accurate client IP
    const clientIp =
        req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
        req.ip ||
        "unknown";

    const userAgent = req.headers["user-agent"] || "unknown";

    // 6. Create JWT Session
    const sessionTokens = await createSession(
        newUser.id,
        clientIp,
        userAgent
    );

    // 7. Return Response
    return res
        .status(201)
        .json(
            new ApiResponse(201, "Signup successful", {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                },
                tokens: sessionTokens,
            })
        );
});
