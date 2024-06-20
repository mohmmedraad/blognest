"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { createAuthorActionSchema } from "@/lib/validations/sites"

export const createAuthorAction = privateProcedure
    .createServerAction()
    .input(createAuthorActionSchema)
    .handler(async ({ ctx, input }) => {
        const isAuthorExist = await db.authors.findFirst({
            where: {
                userId: ctx.user.id,
                username: input.username,
            },
        })

        if (isAuthorExist) {
            throw new ZSAError("CONFLICT")
        }

        await db.authors.create({
            data: {
                name: input.name,
                avatar: input.avatar,
                userId: ctx.user.id,
                username: input.username,
            },
        })
    })
