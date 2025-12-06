import { Request, Response } from "express";
import { userSignUpSchema } from "@repo/validation/validation"
import { AsyncHandler, ApiResponse, ApiError } from "@repo/utils/utils"
import { prisma } from "@repo/db/prisma";
import { createSession } from "../services/createSession.js";

export const handleSignup = AsyncHandler(async (req: Request, res: Response) => {
    const { success, data, error } = userSignUpSchema.safeParse(req.body)

    if (!success) {
        throw new ApiError(400, 'Invalid User Input Schema', error.issues);
    }

    const { email, username } = data

    const existingUser = await prisma.users.findFirst({
        where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
        throw new ApiError(409, 'User already exists');
    }

    // Create user in database
    const newUser = await prisma.users.create({
        data: {
            username,
            email,
        },
    });

    // Create JWT-based session
    const session = await createSession(
        newUser.id,
        req.ip,
        req.headers['user-agent']
    );

    return res.status(201).json(
        new ApiResponse(201, 'Signup successful', {
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
            tokens: session,
        })
    );

})