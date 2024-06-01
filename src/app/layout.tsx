import { site } from "@/config/site"

import "@/styles/globals.css"

import { type Metadata } from "next"
import { GeistSans } from "geist/font/sans"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: {
        default: `${site.name} —  ${site.title}`,
        template: `%s —  ${site.name}`,
    },
    description: site.description,
    keywords: site.keywords,
    authors: site.authors,
    creator: site.creator,
    generator: "Next.js",
    category: "blog builder",
    openGraph: {
        type: "website",
        locale: "en_US",
        title: `${site.name} —  ${site.title}`,
        siteName: site.name,
        description: site.description,
        url: site.url,
        images: `${site.url}/og.png`,
    },
    twitter: {
        card: "summary_large_image",
        title: `${site.name} —  ${site.title}`,
        description: site.description,
        images: `${site.url}/og.png`,
        creator: site.creatorLinks.x,
    },
    icons: {
        icon: `${site.url}/logo.png`,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>{children}</body>
        </html>
    )
}
