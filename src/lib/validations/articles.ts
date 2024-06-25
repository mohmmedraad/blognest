import { z } from "zod"

import { paginationSchema } from "./params"

export const updateArticleSchema = z.object({
    id: z.string(),
    site: z.string().optional(),
    author: z.string().optional(),
    title: z
        .string()
        .min(1)
        .max(100, {
            message: "Title must be between 1 and 100 characters",
        })
        .optional(),
    slug: z
        .string()
        .min(1)
        .max(100, {
            message: "Slug must be between 1 and 100 characters",
        })
        .optional(),
    topics: z
        .array(z.string())
        .min(1, {
            message: "Please select at least one topic",
        })
        .optional(),
    status: z.enum(["unpublished", "published"]).optional(),
})

export const updateArticleContentSchema = z.object({
    id: z.string(),
    content: z.array(z.any()).min(1, {
        message: "Content must not be empty",
    }),
})

export const getArticlesSchema = paginationSchema.extend({
    search: z.string().optional().default(""),
    author: z.string().optional(),
    site: z.string().optional(),
    sortBy: z
        .string()
        .transform((value) => value.split("."))
        .pipe(
            z.tuple([z.enum(["createdAt", "title"]), z.enum(["asc", "desc"])])
        )
        .optional()
        .default("createdAt.desc")
        .catch(["createdAt", "desc"]),
})

export const deleteArticleSchema = z.object({
    id: z.string(),
})
