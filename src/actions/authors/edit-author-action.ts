"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import type { EditAuthorFormSchema } from "@/types"

import { editAuthorFormSchema } from "@/lib/validations/sites"

export const editAuthorAction = async (payload: EditAuthorFormSchema) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const { success, data } = editAuthorFormSchema.safeParse(payload)

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

    await db.authors.update({
        where: {
            id: data.id,
            userId: session.user.id,
        },
        data: {
            name: data.name,
            avatar: data.avatar,
            username: data.username,
        },
    })
}
