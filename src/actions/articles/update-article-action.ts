"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { updateArticleSchema } from "@/lib/validations/articles"

export const updateArticleAction = privateProcedure
    .createServerAction()
    .input(updateArticleSchema)
    .handler(async ({ ctx, input }) => {
        const { id: articleId, site: siteId, author: authorId, ...data } = input
        const isArticleExist = await db.article.findFirst({
            where: {
                id: articleId,
                userId: ctx.user.id,
            },
        })

        if (!isArticleExist) {
            throw new ZSAError("NOT_FOUND")
        }

        const isSlugUpdated = input.slug && input.slug !== isArticleExist.slug

        if (isSlugUpdated) {
            const isSlugExist = await db.article.findFirst({
                where: {
                    slug: input.slug,
                },
            })

            if (isSlugExist) {
                throw new ZSAError("CONFLICT")
            }
        }

        if (input.author) {
            const isAuthorExist = await db.authors.findFirst({
                where: {
                    id: input.author,
                    userId: ctx.user.id,
                },
            })

            if (!isAuthorExist) {
                throw new ZSAError("NOT_FOUND", {
                    field: "author",
                })
            }
        }

        if (input.site) {
            const isSiteExist = await db.site.findFirst({
                where: {
                    id: input.site,
                    userId: ctx.user.id,
                },
            })

            if (!isSiteExist) {
                throw new ZSAError("NOT_FOUND", {
                    field: "site",
                })
            }
        }

        await db.article.update({
            data: {
                siteId,
                authorId,
                ...data,
            },
            where: {
                id: articleId,
                userId: ctx.user.id,
            },
        })
    })
