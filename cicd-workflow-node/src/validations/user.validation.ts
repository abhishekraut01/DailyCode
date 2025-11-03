import { z } from "zod"

export const userSignupSchema = z.object({
    username: z.string().min(8),
    email: z.email().min(8),
    password: z.string().min(8)
})