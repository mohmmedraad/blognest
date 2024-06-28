import { type FC } from "react"
import Image from "next/image"
import { type Site } from "@prisma/client"

import MaxWidthWrapper from "./max-width-wrapper"
import SiteArticles from "./site-articles"

interface TemplateProps {
    site: Pick<
        Site,
        "title" | "description" | "logo" | "id" | "heading" | "subheading"
    >
}

const Template: FC<TemplateProps> = ({ site }) => {
    return (
        <MaxWidthWrapper>
            <div className="mt-24">
                <Image
                    src={site.logo ?? "/placeholder"}
                    width={40}
                    height={40}
                    alt="logo"
                    className="mx-auto"
                />
                <h1 className="mx-auto mt-8 text-balance text-center text-6xl tracking-tighter text-gray-950">
                    {site.heading}
                </h1>
            </div>

            <SiteArticles />
        </MaxWidthWrapper>
    )
}

export default Template
