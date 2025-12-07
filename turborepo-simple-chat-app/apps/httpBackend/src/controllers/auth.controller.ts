import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userSignInSchema, userSignUpSchema } from "@repo/validation/authSchema"
import { ApiError } from "@repo/utils/apiError"
import { ApiResponse } from "@repo/utils/apiResponse"
import { AsyncHandler } from "@repo/utils/asyncHandler"
import { prisma } from "@repo/db/prisma";
import { createSession } from "../services/createSession.js";
import bcrypt from "bcrypt";
import { options, RefreshTokenPayload } from "../interface/index.js";


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
        .cookie("accessToken", sessionTokens.accessToken, options)
        .cookie("refreshToken", sessionTokens.refreshToken, options)
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
    return res.status(200).
        cookie("accessToken", tokens.accessToken, options).
        cookie("refreshToken", tokens.refreshToken, options).
        json(
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

export const handleLogout = AsyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }
    // Delete all sessions for the user
    await prisma.session.deleteMany({
        where: { userId }
    });
    return res.status(200).json(new ApiResponse(200, "Logout successful"));
});

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


export const refreshAccessToken = AsyncHandler(
    async (req: Request, res: Response) => {

        const refreshToken =
            req.cookies?.refreshToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!refreshToken) {
            throw new ApiError(401, "Refresh token not found");
        }

        const secretKey = process.env.JWT_REFRESH_SECRET;

        if (!secretKey) {
            throw new ApiError(500, "Server misconfiguration: Refresh token secret is missing.");
        }

        const decoded = jwt.verify(refreshToken, secretKey) as RefreshTokenPayload;

        // Check if session exists
        const session = await prisma.session.findFirst({
            where: {
                userId: decoded.sub,
                refreshToken: decoded.tokenId,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (!session) {
            throw new ApiError(401, "Invalid session");
        }

        // Delete old session
        await prisma.session.delete({
            where: { id: session.id }
        });

        // Get client info for new session
        const clientIp =
            req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
            req.ip ||
            "unknown";

        const userAgent = req.headers["user-agent"] || "unknown";

        // Create new session with fresh tokens
        const tokens = await createSession(
            decoded.sub,
            clientIp,
            userAgent
        );

        // Send response with new tokens
        return res
            .status(200)
            .cookie("accessToken", tokens.accessToken, options)
            .cookie("refreshToken", tokens.refreshToken, options)
            .json(
                new ApiResponse(200, "Access token refreshed successfully", {
                    tokens,
                })
            );
    }
);