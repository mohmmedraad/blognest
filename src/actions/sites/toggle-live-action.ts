"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { siteToggleLiveSchema } from "@/lib/validations/sites"

export const toggleLiveAction = privateProcedure
    .createServerAction()
    .input(siteToggleLiveSchema)
    .handler(async ({ ctx, input }) => {
        const site = await db.site.findFirst({
            select: { id: true },
            where: { id: input.id, userId: ctx.user.id },
        })

        if (!site) {
            throw new ZSAError("NOT_FOUND")
        }

        await db.site.update({
            data: {
                live: input.live,
            },
            where: {
                id: site.id,
            },
        })
    })
