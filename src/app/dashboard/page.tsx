import { type FC } from "react"
import { db } from "@/server/db"

import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardHeading from "@/components/dashboard-heading"
import DashboardMain from "@/components/dashboard-main"
import DashboardParagraph from "@/components/dashboard-paragraph"

interface DashboardPageProps {}

type Blog = {
    id: string
    title: string
    slug: string
    logo: string

    articles: number
    createdAt: Date
}

const blogs: Blog[] = [
    {
        id: "1",
        title: "Blogny",
        slug: "my-first-blog",
        logo: "/logo.png",
        articles: 3,
        createdAt: new Date(),
    },
    {
        id: "2",
        title: "Huou",
        slug: "my-second-blog",
        logo: "/logo.png",
        articles: 5,
        createdAt: new Date(),
    },
]

const DashboardPage: FC<DashboardPageProps> = async ({}) => {
    // const user = await getCachedUser()

    // if (!user) return

    // const blogs = db.blog.findMany({
    //     where: {
    //         userId: user.id,
    //     },
    // })

    const user = {
        name: "Mohammed Raad",
        blogs,
    }
    return (
        <DashboardMain>
            <CustomBreadcrumb pathname="/dashboard" />
            <DashboardHeading>Dashboard</DashboardHeading>
            <DashboardParagraph>
                Welcome back, {user.name.split(" ")[0]}! view your blogs below.
            </DashboardParagraph>
            <div className="mt-8"></div>
        </DashboardMain>
    )
}

export default DashboardPage
