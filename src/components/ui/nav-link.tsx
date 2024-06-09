"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ClassValue } from "class-variance-authority/types"

import { cn } from "@/lib/utils"

interface NavLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
        React.ComponentProps<typeof Link> {
    href: string
    activeClass?: ClassValue
    matchFullPath?: boolean
    hoverClass?: ClassValue
    asChild?: boolean
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
    (
        {
            href,
            className,
            matchFullPath = true,
            activeClass,
            children,
            hoverClass,
            ...props
        },
        ref
    ) => {
        const pathname = usePathname()
        const isActive = matchFullPath
            ? pathname === href
            : pathname.includes(href)
        if (isActive) className = cn(className, activeClass)

        return (
            <Link
                ref={ref}
                href={href}
                className={cn(className, !isActive && hoverClass)}
                {...props}
            >
                {children}
            </Link>
        )
    }
)

NavLink.displayName = "NavLink"

export default NavLink
