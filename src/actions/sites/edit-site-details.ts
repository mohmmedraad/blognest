"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import { type z } from "zod"

import { siteDetailsActionSchema } from "@/lib/validations/sites"

export const editSiteDetailsAction = async (
    payload: z.infer<typeof siteDetailsActionSchema>
) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const { success, data } = siteDetailsActionSchema.safeParse(payload)

    if (!success) {
        throw new Error("INVALID_DATA")
    }

    const site = await db.site.findFirst({
        select: { id: true, subdomain: true },
        where: { id: data.id, userId: session.user.id },
    })

    if (!site) {
        throw new Error("NOT_FOUND")
    }

    if (data.subdomain && site.subdomain !== data.subdomain) {
        const existingSite = await db.site.findFirst({
            where: { subdomain: data.subdomain },
        })

        if (existingSite) {
            throw new Error("CONFLICT")
        }
    }

    const { id, ...valuesToUpdate } = data

    await db.site.update({
        data: valuesToUpdate,
        where: {
            id,
        },
    })
}
