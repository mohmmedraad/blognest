"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import { type z } from "zod"

import { createAuthorActionSchema } from "@/lib/validations/sites"

export const createAuthorAction = async (
    payload: z.infer<typeof createAuthorActionSchema>
) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const { success, data } = createAuthorActionSchema.safeParse(payload)

    if (!success) {
        throw new Error("INVALID_DATA")
    }

    const isAuthorExist = await db.authors.findFirst({
        where: {
            userId: session.user.id,
            username: data.username,
        },
    })

    if (isAuthorExist) {
        throw new Error("CONFLICT")
    }

    await db.authors.create({
        data: {
            name: data.name,
            avatar: data.avatar,
            userId: session.user.id,
            username: data.username,
        },
    })
}
