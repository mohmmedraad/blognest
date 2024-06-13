"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import type { DeleteAuthorSchema } from "@/types"

import { deleteAuthorSchema } from "@/lib/validations/sites"

export const deleteAuthorAction = async (payload: DeleteAuthorSchema) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const { success, data } = deleteAuthorSchema.safeParse(payload)

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

    await db.authors.delete({
        where: {
            userId: session.user.id,
            id: data.id,
        },
    })
}
