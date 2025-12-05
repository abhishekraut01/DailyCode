import { Request, Response } from "express";
import { userSignUpSchema } from "@repo/validation/validation"
import { AsyncHandler, ApiResponse, ApiError } from "@repo/utils/utils"

export const singUp = AsyncHandler(async (req: Request, res: Response) => {
    const { success, data, error } = userSignUpSchema.safeParse(req.body)

    if (!success) {
        throw new ApiError(400, 'Invalid User Input Schema', error.issues);
    }
    
})