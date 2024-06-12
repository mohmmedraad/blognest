"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import type { GetAuthorsSchema } from "@/types"

import { getAuthorsSchema } from "@/lib/validations/sites"

export const getAuthorsOptionsAction = async (payload: GetAuthorsSchema) => {
    const { limit, page, search } = getAuthorsSchema.parse(payload)

    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const authors = await db.authors.findMany({
        select: {
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
                contains: search,
            },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
            name: "asc",
        },
    })

    return {
        authors,
        hasNextPage: authors.length === limit,
        hasPreviousPage: page > 1,
    }
}
