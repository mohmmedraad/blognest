"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"

import { getArticlesSchema } from "@/lib/validations/articles"

export const getArticlesAction = privateProcedure
    .createServerAction()
    .input(getArticlesSchema)
    .handler(async ({ ctx, input }) => {
        const articles = await db.article.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                topics: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true,
                    },
                },
                site: {
                    select: {
                        id: true,
                        title: true,
                        logo: true,
                        subdomain: true,
                    },
                },
                _count: {
                    select: {
                        views: true,
                    },
                },
            },
            where: {
                title: {
                    contains: input.search,
                },
                userId: ctx.user.id,
            },
            take: input.limit,
            skip: (input.page - 1) * input.limit,
            orderBy: {
                [input.sortBy[0]]: input.sortBy[1],
            },
        })

        return {
            articles,
            hasNextPage: articles.length === input.limit,
            hasPreviousPage: input.page > 1,
        }
    })
