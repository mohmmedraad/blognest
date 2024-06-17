"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import type { EditAuthorActionSchema } from "@/types"

import { editAuthorActionSchema } from "@/lib/validations/sites"

export const editAuthorAction = async (payload: EditAuthorActionSchema) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const { success, data } = editAuthorActionSchema.safeParse(payload)

    if (!success) {
        throw new Error("INVALID_DATA")
    }

    const isAuthorExist = await db.authors.findFirst({
        where: {
            userId: session.user.id,
            id: data.id,
        },
    })

    if (!isAuthorExist) {
        throw new Error("NOT_FOUND")
    }

    if (data.username) {
        const isUsernameExist = await db.authors.findFirst({
            where: {
                userId: session.user.id,
                username: data.username,
                NOT: {
                    id: data.id,
                },
            },
        })

        if (isUsernameExist) {
            throw new Error("CONFLICT")
        }
    }

    const { id, ...valuesToUpdate } = data

    await db.authors.update({
        where: {
            id,
            userId: session.user.id,
        },
        data: valuesToUpdate,
    })
}
