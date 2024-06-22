"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"

export const getAuthorsSelectOptionsAction = privateProcedure
    .createServerAction()
    .handler(async ({ ctx }) => {
        const authors = await db.authors.findMany({
            select: {
                id: true,
                name: true,
                avatar: true,
                username: true,
            },
            where: {
                userId: ctx.user.id,
            },
            orderBy: {
                name: "asc",
            },
        })

        return authors
    })
