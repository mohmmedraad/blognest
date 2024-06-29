import { type FC } from "react"
import Image from "next/image"
import { db } from "@/server/db"
import type { SearchParams } from "@/types"

import { getCachedSite } from "@/lib/cached-data"
import { userSitePageSearchParams } from "@/lib/validations/sites"

import MaxWidthWrapper from "./max-width-wrapper"
import SiteArticles from "./site-articles"

interface TemplateProps {
    subdomain: string
    searchParams: SearchParams
}

const Template: FC<TemplateProps> = async ({ subdomain, searchParams }) => {
    const site = await getCachedSite(subdomain)
    const {
        search,
        sortBy: [sortBy, sortType],
    } = userSitePageSearchParams.parse(searchParams)

    if (!site) return null

    const articles = await db.article.findMany({
        select: {
            slug: true,
            title: true,
            thumbnail: true,
            topics: true,
        },
        where: {
            site: {
                subdomain: site.subdomain,
            },
            title: {
                contains: search,
            },
        },
        take: 1,
        skip: 0,
        orderBy: {
            [sortBy]: sortType,
        },
    })

    return (
        <MaxWidthWrapper>
            <div className="mt-24">
                <Image
                    src={site.logo ?? "/placeholder.png"}
                    width={40}
                    height={40}
                    alt="logo"
                    className="mx-auto"
                />
                <h1 className="mx-auto mt-8 text-balance text-center text-6xl font-medium tracking-tighter text-gray-950">
                    {site.heading}
                </h1>
            </div>
            <div className="mt-24 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                <SiteArticles
                    subdomain={site.subdomain}
                    initialArticles={articles}
                />
            </div>
        </MaxWidthWrapper>
    )
}

export default Template
