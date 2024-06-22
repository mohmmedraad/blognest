"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"

export const getSitesSelectOptionsAction = privateProcedure
    .createServerAction()
    .handler(async ({ ctx }) => {
        const sites = await db.site.findMany({
            select: {
                id: true,
                title: true,
                logo: true,
            },
            where: {
                userId: ctx.user.id,
            },
            orderBy: {
                title: "asc",
            },
        })

        return sites
    })
