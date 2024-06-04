import {z} from "zod"

export const verifyPageSearchParamsSchema = z.object({
    token: z.string({
        message: "You must provide a token",
    }),
})