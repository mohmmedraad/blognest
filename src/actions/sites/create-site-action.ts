"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { createSiteSchema } from "@/lib/validations/sites"

export const createSiteAction = privateProcedure
    .createServerAction()
    .input(createSiteSchema)
    .handler(async ({ ctx, input }) => {
        const isSiteExist = await db.site.findFirst({
            select: { id: true },
            where: { subdomain: input.subdomain },
        })

        if (isSiteExist) {
            throw new ZSAError("CONFLICT")
        }

        await db.site.create({
            data: {
                userId: ctx.user.id,
                title: input.title,
                subdomain: input.subdomain,
                description: input.description,
            },
        })
    })
