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
        where: { subdomain: data.subdomain, userId: session.user.id },
    })

    if (!site) {
        throw new Error("NOT_FOUND")
    }

    if (site.subdomain !== data.subdomain) {
        const existingSite = await db.site.findFirst({
            where: { subdomain: data.subdomain },
        })

        if (existingSite) {
            throw new Error("CONFLICT")
        }
    }

    await db.site.update({
        data: {
            title: data.title,
            subdomain: data.subdomain,
            description: data.description,
            logo: data.logo,
        },
        where: {
            subdomain: site.subdomain,
        },
    })
}
