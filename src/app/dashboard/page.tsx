import { type FC } from "react"

import { getCachedUser } from "@/lib/cached-data"
import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"
import DashboardParagraph from "@/components/dashboard-paragraph"

import Charts from "./_components/charts"

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = async ({}) => {
    const user = await getCachedUser()

    if (!user) return

    const sitesVisiters = [
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
        <DashboardMain>
            <CustomBreadcrumb pathname="/dashboard" />
            <DashboardHeading>Dashboard</DashboardHeading>
            <DashboardParagraph>
                Welcome back, {user.name?.split(" ")[0]}!.
            </DashboardParagraph>
            <Charts
                sitesVisiters={sitesVisiters}
                articlesViews={articlesViews}
            />
        </DashboardMain>
    )
}

export default DashboardPage
