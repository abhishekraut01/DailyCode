import { Request, Response } from 'express'
import { userSignupSchema } from "../validations/user.validation"

export const signup = async (req: Request, res: Response) => {
    const parsedData = userSignupSchema.safeParse(req.body)

    if (!parsedData.success) {
        res.status(411).json({
            success: false,
            message: "User input is invalid"
        })
    }

    const {username , email , password} = parsedData.data

    

}