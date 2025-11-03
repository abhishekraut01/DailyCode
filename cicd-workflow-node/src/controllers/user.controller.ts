import type { Request, Response } from 'express'
import { userSignupSchema } from '../validations/user.validation.js'
import { prisma } from '../db/prisma.db.js'
import { AsyncHandler } from '../utils/aysncHandler.utils.js'

export const signup = AsyncHandler(async (req: Request, res: Response) => {
    const parsedData = userSignupSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(411).json({
            success: false,
            message: "User input is invalid"
        })
    }

    const { username, email, password } = parsedData.data

    const existing = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existing) {
        return res.status(409).json({
            success: false,
            message: "user already exist"
        })
    }

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })

    return res
        .status(200).json({
            success: true,
            message: "user created successfully",
            id: newUser.id
        })
})