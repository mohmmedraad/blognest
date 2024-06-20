"use server"

import { privateProcedure } from "@/actions/procedures/private"
import { db } from "@/server/db"
import { ZSAError } from "zsa"

import { editAuthorActionSchema } from "@/lib/validations/sites"

export const editAuthorAction = privateProcedure
    .createServerAction()
    .input(editAuthorActionSchema)
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

        if (input.username) {
            const isUsernameExist = await db.authors.findFirst({
                where: {
                    userId: ctx.user.id,
                    username: input.username,
                    NOT: {
                        id: input.id,
                    },
                },
            })

            if (isUsernameExist) {
                throw new ZSAError("CONFLICT")
            }
        }

        const { id, ...valuesToUpdate } = input

        await db.authors.update({
            where: {
                id,
                userId: ctx.user.id,
            },
            data: valuesToUpdate,
        })
    })
