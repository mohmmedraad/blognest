import { type FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import { format } from "date-fns"
import { PackageOpen, PlusCircle } from "lucide-react"

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

const SitesPage: FC<SitesPageProps> = async ({}) => {
    const session = await getServerAuthSession()

    if (!session?.user) {
        return
    }
    const sites = await db.site.findMany({
        select: {
            title: true,
            subdomain: true,
            logo: true,
            description: true,
            createdAt: true,
        },
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    })
    return (
        <DashboardMain>
            <CustomBreadcrumb pathname={"/dashboard/sites"} />
            <DashboardHeading>Sites</DashboardHeading>
            {sites.length === 0 ? (
                <div className="flex size-full flex-col items-center justify-center text-center">
                    <div className="rounded-xl border border-gray-300 p-3.5">
                        <PackageOpen className="size-7 text-gray-700" />
                    </div>
                    <p className="mt-10 text-4xl font-bold text-gray-900">
                        NO Sites
                    </p>
                    <p className="mt-4 max-w-[512px] text-xl text-gray-600">
                        Create new site by clicking on the button below, and
                        start your journey by creating new site.
                    </p>
                    <AddSiteDialog size={"xl"} className="mt-8">
                        Crate site
                    </AddSiteDialog>
                </div>
            ) : (
                <>
                    <AddSiteDialog size={"lg"} className="ml-auto mt-8 gap-1">
                        <PlusCircle className="size-5" />
                        Crate site
                    </AddSiteDialog>
                    <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sites.map((site) => (
                            <Card key={site.subdomain}>
                                <div className="p-6 pb-0">
                                    <Image
                                        width={40}
                                        height={40}
                                        alt="logo"
                                        src={site.logo ?? "/placeholder.png"}
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
                                        <Link href={siteUrl(site.subdomain)}>
                                            <Badge
                                                className="rounded-full hover:underline hover:underline-offset-2"
                                                variant={"outline"}
                                            >
                                                {siteUrl(site.subdomain, false)}
                                            </Badge>
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                            {format(
                                                site.createdAt,
                                                "yyy/MM/dd"
                                            )}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </DashboardMain>
    )
}

export default SitesPage
