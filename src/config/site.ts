import { Globe, LayoutDashboard, SquareGanttChart, Users } from "lucide-react"

export const site = {
    name: "Blognest",
    title: "Open-Source Blog builder build with Next.js, Bootstrapped by T3-Stack",
    description:
        "Blognest is an open-source blogs builder build with Next.js, Typescript, Tailwind CSS, and Neon. It's bootstrapped by T3-Stack. Build your blog with Ease.",
    url: "https://blognest-blog.vercel.app",
    keywords: [
        "Open-source blog builder app",
        "next.js",
        "nextjs app router",
        "react",
        "server-action",
        "zod",
        "next-auth",
        "prisma",
        "typeScript",
        "tailwindCSS",
        "blog builder",
        "e-commerce for books",
        "neon database",
        "open-source development",
        "typeScript app development",
    ],
    githubLink: "https://github.com/mohmmedraad/blognest",
    authors: [
        {
            name: "mohammed raad",
            // TODO: add your portfolio link
        },
    ],
    creatorLinks: {
        github: "https://github.com/mohammedraad/Bookji",
        githubAccount: "https://github.com/mohammedraad",
        x: "https://twitter.com/mohammedraad_0",
        telegram: "https://t.me/mohammedraad_0",
    },
    creator: "mohammed raad",
    links: [],
}

export const DASHBOARD_PRIMARY_LINKS = [
    {
        name: "Dashboard",
        href: "/dashboard",
        Icon: LayoutDashboard,
        matchSegments: false,
    },
    {
        name: "Sites",
        href: "/dashboard/sites",
        Icon: Globe,
        matchSegments: true,
    },
    {
        name: "Articles",
        href: "/dashboard/articles",
        Icon: SquareGanttChart,
        matchSegments: false,
    },
    {
        name: "Authors",
        href: "/dashboard/authors",
        Icon: Users,
        matchSegments: false,
    },
]
