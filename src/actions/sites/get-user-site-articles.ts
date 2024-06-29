"use server"

import { db } from "@/server/db"
import { createServerAction } from "zsa"

import { getUserSiteArticlesSchema } from "@/lib/validations/sites"

export const getUserSiteArticles = createServerAction()
    .input(getUserSiteArticlesSchema)
    .handler(async ({ input }) => {
        const [sortBy, sortType] = input.sortBy
        const articles = await db.article.findMany({
            select: {
                slug: true,
                title: true,
                thumbnail: true,
                topics: true,
            },
            where: {
                site: {
                    subdomain: input.subdomain,
                },
                title: {
                    contains: input.search,
                },
            },
            take: input.limit,
            skip: (input.page - 1) * input.limit,
            orderBy: {
                [sortBy]: sortType,
            },
        })

        console.log({
            page: input.page,
        })
        return articles
    })
