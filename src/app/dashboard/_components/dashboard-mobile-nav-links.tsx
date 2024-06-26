"use client"

import { type FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { DASHBOARD_PRIMARY_LINKS } from "@/config/site"
import { cn } from "@/lib/utils"

interface DashboardMobileNavLinksProps {}

const DashboardMobileNavLinks: FC<DashboardMobileNavLinksProps> = ({}) => {
    const pathname = usePathname()
    return (
        <div className="grid gap-2">
            {DASHBOARD_PRIMARY_LINKS.map(
                ({ name, href, Icon, matchSegments }) => (
                    <Link
                        key={name}
                        className={cn(
                            "relative flex w-full items-center rounded-lg px-3 py-2 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50",
                            matchSegments
                                ? pathname.startsWith(href)
                                : pathname === href &&
                                      "bg-gray-50 text-gray-900"
                        )}
                        href={href}
                        prefetch={false}
                    >
                        <Icon className="mr-3 size-5 text-gray-500" />
                        {name}
                    </Link>
                )
            )}
        </div>
    )
}

export default DashboardMobileNavLinks
