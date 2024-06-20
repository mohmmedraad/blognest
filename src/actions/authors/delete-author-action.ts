"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { deleteAuthorSchema } from "@/lib/validations/sites"

export const deleteAuthorAction = privateProcedure
    .createServerAction()
    .input(deleteAuthorSchema)
    .handler(async ({ ctx, input }) => {
        const isAuthorExist = await db.authors.findFirst({
            where: {
                userId: ctx.user.id,
                id: input.id,
            },
        })

        if (!isAuthorExist) {
            throw new ZSAError("NOT_FOUND")
        }

        await db.authors.delete({
            where: {
                userId: ctx.user.id,
                id: input.id,
            },
        })
    })
