import { z } from "zod"

import { paginationSchema } from "./params"

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

export const siteDetailsFormSchema = createSiteSchema.extend({
    logo: z.array(z.instanceof(File)),
})

export const siteDetailsActionSchema = createSiteSchema.partial().extend({
    id: z.string(),
    logo: z.string({ message: "You must provide a logo" }).optional(),
})

export const createAuthorFormSchema = z.object({
    name: z.string({ message: "You must provide a name" }).min(5, {
        message: "Name must be at least 5 characters",
    }),
    username: z.string({ message: "You must provide a username" }).min(3, {
        message: "Username must be at least 3 characters",
    }),
    avatar: z.array(z.instanceof(File)),
})

export const createAuthorActionSchema = createAuthorFormSchema.extend({
    avatar: z
        .string({ message: "You must provide a logo" })
        .url({ message: "Invalid URL" }),
})

export const getAuthorsSchema = paginationSchema.extend({
    search: z.string().optional().default(""),
})

export const editAuthorFormSchema = createAuthorActionSchema.extend({
    id: z.string(),
})

export const editAuthorActionSchema = createAuthorActionSchema
    .partial()
    .extend({
        id: z.string(),
    })

export const deleteAuthorSchema = z.object({
    id: z.string(),
})
