import { type FC } from "react"
import { notFound, redirect } from "next/navigation"

import { getCachedUser, getUserCachedSite } from "@/lib/cached-data"
import { Separator } from "@/components/ui/separator"
import DashboardSiteHeading from "@/components/dashboard-site-heading"
import DashboardSiteParagraph from "@/components/dashboard-site-paragraph"

import Charts from "./_components/charts"

interface SitePageProps {
    params: {
        subdomain?: string
    }
}

const SitePage: FC<SitePageProps> = async ({ params: { subdomain } }) => {
    const user = await getCachedUser()
    if (!user) {
        return redirect("/login")
    }

    if (!subdomain) {
        return notFound()
    }

    const site = await getUserCachedSite(user.id, subdomain)

    if (!site) {
        return notFound()
    }

    const siteVisiters = [
        { name: "January", visiters: 400 },
        { name: "February", visiters: 300 },
        { name: "March", visiters: 200 },
        { name: "April", visiters: 278 },
        { name: "May", visiters: 189 },
        { name: "June", visiters: 239 },
        { name: "July", visiters: 349 },
    ]

    const articlesViews = [
        { name: "January", views: 400 },
        { name: "February", views: 300 },
        { name: "March", views: 200 },
        { name: "April", views: 278 },
        { name: "May", views: 189 },
        { name: "June", views: 239 },
        { name: "July", views: 349 },
    ]

    return (
        <div>
            <DashboardSiteHeading>Overview</DashboardSiteHeading>
            <DashboardSiteParagraph>
                Take a look at latest update on your site
            </DashboardSiteParagraph>
            <Separator className="mb-6 mt-5" />
            <Charts
                site={site}
                siteVisiters={siteVisiters}
                articlesViews={articlesViews}
            />
        </div>
    )
}

export default SitePage
