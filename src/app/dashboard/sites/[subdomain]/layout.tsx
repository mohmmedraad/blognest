import { type FC } from "react"
import { notFound } from "next/navigation"
import { getServerAuthSession } from "@/server/auth"

import { getUserCachedSite } from "@/lib/cached-data"
import NavLink from "@/components/ui/nav-link"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"

import SiteBreadcrumb from "./_components/site-breadcrumb"

interface SiteLayoutProps {
    children: React.ReactNode
    params: {
        subdomain?: string
    }
}

const BLOG_LINKS = [
    {
        href: "/dashboard/sites/(subdomain)",
        label: "Overview",
    },
    {
        href: "/dashboard/sites/(subdomain)/details",
        label: "Details",
    },
    {
        href: "/dashboard/sites/(subdomain)/articles",
        label: "Articles",
    },
    {
        href: "/dashboard/sites/(subdomain)/settings",
        label: "Settings",
    },
]

const SiteLayout: FC<SiteLayoutProps> = async ({
    params: { subdomain },
    children,
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
        <DashboardMain>
            <SiteBreadcrumb />
            <DashboardHeading>{site.title}</DashboardHeading>
            <nav className="mb-8 mt-6 flex gap-1 rounded-[10px] border border-gray-200 bg-gray-50 p-1">
                {BLOG_LINKS.map((link) => (
                    <NavLink
                        key={link.label}
                        href={link.href.replace("(subdomain)", site.subdomain)}
                        className="rounded-md px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-white"
                        activeClass="bg-white text-gray-700"
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
            {children}
        </DashboardMain>
    )
}

export default SiteLayout
