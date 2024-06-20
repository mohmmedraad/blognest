"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { siteDetailsActionSchema } from "@/lib/validations/sites"

export const editSiteDetailsAction = privateProcedure
    .createServerAction()
    .input(siteDetailsActionSchema)
    .handler(async ({ ctx, input }) => {
        const site = await db.site.findFirst({
            select: { id: true, subdomain: true },
            where: { id: input.id, userId: ctx.user.id },
        })

        if (!site) {
            throw new ZSAError("NOT_FOUND")
        }

        if (input.subdomain && site.subdomain !== input.subdomain) {
            const existingSite = await db.site.findFirst({
                where: { subdomain: input.subdomain },
            })

            if (existingSite) {
                throw new ZSAError("CONFLICT")
            }
        }

        const { id, ...valuesToUpdate } = input

        await db.site.update({
            data: valuesToUpdate,
            where: {
                id,
            },
        })
    })
