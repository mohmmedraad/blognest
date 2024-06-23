"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { updateArticleContentSchema } from "@/lib/validations/articles"

export const updateArticleContentAction = privateProcedure
    .createServerAction()
    .input(updateArticleContentSchema)
    .handler(async ({ ctx, input }) => {
        const isArticleExist = await db.article.findFirst({
            where: {
                id: input.id,
                userId: ctx.user.id,
            },
        })

        if (!isArticleExist) {
            throw new ZSAError("NOT_FOUND")
        }

        await db.article.update({
            data: {
                content: input.content,
            },
            where: {
                id: input.id,
                userId: ctx.user.id,
            },
        })
    })
