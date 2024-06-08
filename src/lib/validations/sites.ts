import { z } from "zod"

export const createSiteSchema = z.object({
    title: z.string({ message: "You must provide a title" }).min(5, {
        message: "Title must be at least 5 characters",
    }),
    description: z
        .string({ message: "You must provide a description" })
        .min(15, {
            message: "Description must be at least 15 characters",
        }),
    subdomain: z.string({ message: "You must provide a subdomain" }).min(3, {
        message: "Subdomain must be at least 3 characters",
    }),
})
