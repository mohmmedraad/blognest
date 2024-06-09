import { type FC } from "react"
import { notFound } from "next/navigation"
import { getServerAuthSession } from "@/server/auth"

import { getUserCachedSite } from "@/lib/cached-data"
import { Separator } from "@/components/ui/separator"
import DashboardSiteHeading from "@/components/dashboard-site-heading"
import DashboardSiteParagraph from "@/components/dashboard-site-paragraph"

import SiteEditDetailsForm from "./_components/site-details-form"

interface SiteDetailsPageProps {
    params: {
        subdomain?: string
    }
}

const SiteDetailsPage: FC<SiteDetailsPageProps> = async ({
    params: { subdomain },
}) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        return
    }

    if (!subdomain) {
        return notFound()
    }

    const site = await getUserCachedSite(session.user.id, subdomain)

    if (!site) {
        return notFound()
    }

    return (
        <div>
            <DashboardSiteHeading>Details</DashboardSiteHeading>
            <DashboardSiteParagraph></DashboardSiteParagraph>
            <Separator className="mb-6 mt-5" />
            <SiteEditDetailsForm {...site} />
        </div>
    )
}

export default SiteDetailsPage
