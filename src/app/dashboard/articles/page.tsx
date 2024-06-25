import { type FC } from "react"

import { getCachedUser } from "@/lib/cached-data"
import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"

import { ArticlesTable } from "./_components/articles-table"

interface ArticlesPageProps {}

const ArticlesPage: FC<ArticlesPageProps> = async ({}) => {
    const user = await getCachedUser()
    if (!user) return null

    return (
        <DashboardMain>
            <CustomBreadcrumb pathname={"/dashboard/articles"} />
            <DashboardHeading>Articles</DashboardHeading>
            <ArticlesTable />
        </DashboardMain>
    )
}

export default ArticlesPage
