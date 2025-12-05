import { Request, Response } from "express";
import { AsyncHandler } from "../utils/asyncHandler.js";
import {userSignUpSchema} from "@repo/validation/validation"

export const singUp = AsyncHandler(async (req: Request, res: Response) => {
    const {success , data } = userSignUpSchema.safeParse(req.body)

    if(!success){
        
    }
})