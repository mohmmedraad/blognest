import { type FC } from "react"
import { getServerAuthSession } from "@/server/auth"
import { db } from "@/server/db"
import { PackageOpen } from "lucide-react"

import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"

import AddSiteDialog from "../sites/_components/add-site-dialog"
import { AuthorsTable } from "./_components/authors-table"

interface AuthorsPageProps {}

const AuthorsPage: FC<AuthorsPageProps> = async ({}) => {
    const session = await getServerAuthSession()
    if (!session?.user) {
        return
    }
    const sites = await db.site.findMany({
        select: {
            id: true,
        },
        where: {
            userId: session.user.id,
        },
    })


    return (
        <DashboardMain>
            <CustomBreadcrumb pathname={"/dashboard/Authors"} />
            <DashboardHeading>Authors</DashboardHeading>

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
                <AuthorsTable />
            )}
        </DashboardMain>
    )
}

export default AuthorsPage
