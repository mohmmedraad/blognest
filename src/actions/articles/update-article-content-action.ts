"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { type TElement } from "@udecode/plate-common"
import { ZSAError } from "zsa"

import { extractArticleImage } from "@/lib/utils"
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

        const thumbnail = extractArticleImage(
            input.content as unknown as TElement[]
        )

        await db.article.update({
            data: {
                content: input.content,
                thumbnail,
            },
            where: {
                id: input.id,
                userId: ctx.user.id,
            },
        })
    })
