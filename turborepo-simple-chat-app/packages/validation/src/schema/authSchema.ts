import z from "zod";

export const userSignUpSchema = z.object({
    username: z
        .string()
        .min(3, "Username should be at least 3 characters long")
        .max(20, "Username cannot exceed 20 characters"),

    email: z
        .email("Invalid email format"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
});

export const userSignInSchema = z.object({
    identifier: z
        .string()
        .min(3, "Username or email is required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
});
