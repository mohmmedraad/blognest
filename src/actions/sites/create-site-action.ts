"use server"

import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import { type z } from "zod"

import { createSiteSchema } from "@/lib/validations/sites"

export const createSiteAction = async (
    payload: z.infer<typeof createSiteSchema>
) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        throw new Error("UNAUTHORIZED")
    }

    const { success, data } = createSiteSchema.safeParse(payload)

    if (!success) {
        throw new Error("INVALID_DATA")
    }

    const isSiteExist = await db.site.findFirst({
        select: { id: true },
        where: { subdomain: data.subdomain },
    })

    if (isSiteExist) {
        throw new Error("CONFLICT")
    }

    await db.site.create({
        data: {
            userId: session.user.id,
            title: data.title,
            subdomain: data.subdomain,
            description: data.description,
        },
    })
}
