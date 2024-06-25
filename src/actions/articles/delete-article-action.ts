"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { deleteArticleSchema } from "@/lib/validations/articles"

export const deleteArticleAction = privateProcedure
    .createServerAction()
    .input(deleteArticleSchema)
    .handler(async ({ ctx, input }) => {
        const isAuthorExist = await db.article.findFirst({
            where: {
                userId: ctx.user.id,
                id: input.id,
            },
        })

        if (!isAuthorExist) {
            throw new ZSAError("NOT_FOUND")
        }

        await db.article.delete({
            where: {
                userId: ctx.user.id,
                id: input.id,
            },
        })
    })
