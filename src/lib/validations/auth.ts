import { z } from "zod"

export const signUpSchema = z.object({
    name: z.string({ message: "You must provide a name" }).min(3, {
        message: "Name must be at least 3 characters",
    }),
    email: z
        .string({
            message: "You must provide a valid email",
        })
        .email({
            message: "You must provide a valid email",
        }),
    password: z
        .string({
            message: "You must provide a password",
        })
        .min(8, {
            message: "Password must be at least 8 characters",
        }),
})

export const loginSchema = z.object({
    email: z
        .string({
            message: "You must provide a valid email",
        })
        .email({
            message: "You must provide a valid email",
        }),
    password: z
        .string({
            message: "You must provide a password",
        })
        .min(8, {
            message: "Password must be at least 8 characters",
        }),
})
