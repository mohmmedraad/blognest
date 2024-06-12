import { z } from "zod"

export const verifyPageSearchParamsSchema = z.object({
    token: z.string({
        message: "You must provide a token",
    }),
})

export const paginationSchema = z.object({
    page: z
        .number({
            message: "You must provide a cursor",
        })
        .default(1),
    limit: z
        .number({
            message: "You must provide a limit",
        })
        .optional()
        .default(10),
})
