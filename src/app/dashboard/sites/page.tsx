import { type FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

import { siteUrl } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"

import AddSiteDialog from "./_components/add-site-dialog"

interface SitesPageProps {}

const SitesPage: FC<SitesPageProps> = ({}) => {
    const sites = [
        {
            title: "Blogny",
            active: true,
            slug: "blogny",
            logo: "/logo.png",
            description: "This is a blog site.",
            createdAt: new Date("2021-09-01T00:00:00Z"),
        },
        {
            title: "Huou",
            active: false,
            slug: "huou",
            logo: "/logo.png",
            description: "Read the latest news about World events.",
            createdAt: new Date(),
        },
    ]
    return (
        <DashboardMain>
            <CustomBreadcrumb pathname={"/dashboard/sites"} />
            <DashboardHeading>Sites</DashboardHeading>
            <AddSiteDialog />
            <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sites.map((site) => (
                    <Card key={site.slug}>
                        <div className="p-6 pb-0">
                            <Image
                                width={40}
                                height={40}
                                alt="logo"
                                src={site.logo}
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{site.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {site.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <Link href={siteUrl(site.slug)}>
                                    <Badge
                                        className="rounded-full hover:underline hover:underline-offset-2"
                                        variant={"outline"}
                                    >
                                        {siteUrl(site.slug, false)}
                                    </Badge>
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {format(site.createdAt, "yyy/MM/dd")}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardMain>
    )
}

export default SitesPage
