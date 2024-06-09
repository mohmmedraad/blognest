"use client"

import { type FC } from "react"
import Link from "next/link"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarLinkProps {
    isOpen: boolean
    Icon: LucideIcon
    href: string
    name: string
    active: boolean
}

const SidebarLink: FC<SidebarLinkProps> = ({
    isOpen,
    Icon,
    href,
    name,
    active,
}) => {
    return isOpen ? (
        <Link
            className={cn(
                "relative flex w-full items-center rounded-lg px-3 py-2 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50",
                active && "bg-gray-50 text-gray-900"
            )}
            href={href}
            // activeClass="bg-gray-50 text-gray-900"
            prefetch={false}
        >
            <Icon className="mr-3 size-6 text-gray-500" />
            <span
                className={cn(
                    "max-w-[150px] truncate text-base",
                    isOpen
                        ? " translate-x-0 opacity-100"
                        : "-translate-x-96 opacity-0"
                )}
            >
                {name}
            </span>
        </Link>
    ) : (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    className={cn(
                        "relative h-10 w-full items-center rounded-lg px-3 py-2 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50",
                        active && "bg-gray-50 text-gray-900"
                    )}
                    href={href}
                    // activeClass="bg-gray-50 text-gray-900"
                    prefetch={false}
                >
                    <Icon className="mr-3 size-6 text-gray-500" />
                    <span
                        className={cn(
                            "max-w-[200px] truncate text-base",
                            isOpen === false ? "opacity-0" : "opacity-100"
                        )}
                    >
                        {name}
                    </span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
    )
}

export default SidebarLink
