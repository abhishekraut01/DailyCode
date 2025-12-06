import { Request, Response } from "express";
import { userSignInSchema, userSignUpSchema } from "@repo/validation/validation"
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

    // 4. Create User 
    const newUser = await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
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


export const handleSignin = AsyncHandler(async (req, res) => {
    const { success, data, error } = userSignInSchema.safeParse(req.body);

    if (!success) {
        throw new ApiError(400, "Invalid Input Schema", error.issues);
    }

    const { identifier, password } = data;

    // 1. Find user by email OR username
    const user = await prisma.users.findFirst({
        where: {
            OR: [
                { email: identifier },
                { username: identifier }
            ]
        }
    });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // 3. Extract IP + User-Agent
    const clientIp =
        req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
        req.ip ||
        "unknown";

    const userAgent = req.headers["user-agent"] || "unknown";

    // 4. Create session tokens (access + refresh)
    const tokens = await createSession(
        user.id,
        clientIp,
        userAgent
    );

    // 5. Send response
    return res.status(200).json(
        new ApiResponse(200, "Signin successful", {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            tokens,
        })
    );
});

export const healthCheck = (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};


export const getCurrentUser = AsyncHandler(async (req, res) => {
    if (!req.user?.id) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await prisma.users.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: true
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "User fetched successfully", user));
});
