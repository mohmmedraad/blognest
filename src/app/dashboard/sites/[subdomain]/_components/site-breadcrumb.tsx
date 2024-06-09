"use client"

import { type FC } from "react"
import { usePathname } from "next/navigation"

import CustomBreadcrumb from "@/components/custom-breadcrumb"

interface SiteBreadcrumbProps {}

const SiteBreadcrumb: FC<SiteBreadcrumbProps> = ({}) => {
    const pathname = usePathname()
    return <CustomBreadcrumb pathname={pathname} />
}

export default SiteBreadcrumb
