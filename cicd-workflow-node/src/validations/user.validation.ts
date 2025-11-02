import {z} from "zod"


export const userSignupSchema = z.object({
    username:string().min(3),
    email:email().min(8),
    password:string().min(8)
})