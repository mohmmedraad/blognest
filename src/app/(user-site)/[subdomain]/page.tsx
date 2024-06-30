import { type FC } from "react"
import { notFound } from "next/navigation"
import type { SearchParams } from "@/types"

import { getCachedSite } from "@/lib/cached-data"

import Template from "../_components/template"

interface UserSitePageProps {
    params: {
        subdomain?: string
    }
    searchParams: SearchParams
}

const UserSitePage: FC<UserSitePageProps> = async ({
    params: { subdomain },
    searchParams,
}) => {
    if (!subdomain) return null

    const site = await getCachedSite(subdomain)
    if (!site) return notFound()
    if (!site.logo || !site.heading) return notFound()

    return <Template subdomain={site.subdomain} searchParams={searchParams} />
}

export default UserSitePage
