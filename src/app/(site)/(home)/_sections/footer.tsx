import { type FC } from "react"
import NextLink from "next/link"

import { Icons } from "@/components/icons"
import Logo from "@/components/logo"
import MaxWidthWrapper from "@/components/max-width-wrapper"

interface FooterProps {}

const SOCIAL_LINKS = [
    {
        Icon: Icons.x,
        href: "https://x.com/",
    },
    {
        Icon: Icons.instagram,
        href: "https://www.instagram.com/",
    },
    {
        Icon: Icons.linkedin,
        href: "https://www.linkedin.com/",
    },
]

const Footer: FC<FooterProps> = ({}) => {
    return (
        <section className="bg-gray-950 py-24">
            <MaxWidthWrapper>
                <NextLink href={"/"}>
                    <Logo className="mx-auto w-[70px]" width={70} height={70} />
                </NextLink>
                <div className="flex justify-center gap-4 py-6">
                    {SOCIAL_LINKS.map(({ Icon, href }) => (
                        <NextLink key={href} href={"/"}>
                            <Icon className="size-6 text-gray-500 hover:text-gray-300" />
                        </NextLink>
                    ))}
                </div>
                <div className="text-center text-sm text-gray-600">
                    © 2024 Blognest, Inc. All rights reserved.
                </div>
            </MaxWidthWrapper>
        </section>
    )
}

export default Footer
