import { cache } from "react"
import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"

export const getCachedUser = cache(async () => {
    try {
        const session = await getServerAuthSession()

        return session?.user
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return null
    }
})

export const getUserCachedSite = cache(
    async (userId: string, subdomain: string) => {
        try {
            const site = await db.site.findFirst({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    logo: true,
                    subdomain: true,
                    heading: true,
                    subheading: true,
                },
                where: {
                    subdomain,
                    userId,
                },
            })

            return site
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)
            return null
        }
    }
)

export const getCachedSite = cache(async (subdomain: string) => {
    try {
        const site = await db.site.findFirst({
            select: {
                id: true,
                title: true,
                description: true,
                logo: true,
                subdomain: true,
                heading: true,
                subheading: true,
            },
            where: {
                subdomain,
            },
        })

        return site
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        return null
    }
})
