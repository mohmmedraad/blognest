import { type FC } from "react"
import { getServerAuthSession } from "@/server/auth"

import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"

import { AuthorsTable } from "./_components/authors-table"

interface AuthorsPageProps {}

const AuthorsPage: FC<AuthorsPageProps> = async ({}) => {
    const session = await getServerAuthSession()
    if (!session?.user) {
        return
    }

    return (
        <DashboardMain>
            <CustomBreadcrumb pathname={"/dashboard/Authors"} />
            <DashboardHeading>Authors</DashboardHeading>

            <AuthorsTable />
        </DashboardMain>
    )
}

export default AuthorsPage
