"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"

import { getAuthorsSchema } from "@/lib/validations/sites"

export const getAuthorsOptionsAction = privateProcedure
    .createServerAction()
    .input(getAuthorsSchema)
    .handler(async ({ ctx, input }) => {
        const authors = await db.authors.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
            where: {
                username: {
                    contains: input.search,
                },
                userId: ctx.user.id,
            },
            take: input.limit,
            skip: (input.page - 1) * input.limit,
            orderBy: {
                name: "asc",
            },
        })

        return {
            authors,
            hasNextPage: authors.length === input.limit,
            hasPreviousPage: input.page > 1,
        }
    })
