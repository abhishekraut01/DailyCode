import { Request, Response } from "express";
import {userSignUpSchema} from "@repo/validation/validation"

export const singUp = AsyncHandler(async (req: Request, res: Response) => {
    const {success , data } = userSignUpSchema.safeParse(req.body)

    if(!success){
        res.status(411).json(ApiResponse)
    }


})