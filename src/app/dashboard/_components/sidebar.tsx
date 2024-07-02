"use client"

import { useState, type FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, LogOut, Settings } from "lucide-react"

import { DASHBOARD_PRIMARY_LINKS, site } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import Logo from "@/components/logo"
import { UserAvatar } from "@/components/user-avatar"

import SidebarLink from "./sidebar-link"

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    return (
        <div className="relative hidden lg:block">
            <aside
                className={cn(
                    "sticky left-0 top-0 flex h-screen w-full flex-col items-center justify-between border-r bg-background py-8 transition-all  duration-300",
                    isOpen ? "w-72" : "w-20"
                )}
            >
                <div className="w-full px-6">
                    <Link
                        className="flex w-full items-center gap-2.5"
                        href="/"
                        prefetch={false}
                    >
                        <Logo className="size-8" />
                        {isOpen ? (
                            <span className="text-3xl font-semibold text-foreground">
                                {site.name}
                            </span>
                        ) : null}
                    </Link>
                </div>
                <nav className="mt-6 flex w-full flex-col items-center gap-1 px-4">
                    <TooltipProvider disableHoverableContent>
                        {DASHBOARD_PRIMARY_LINKS.map(
                            ({ name, href, Icon, matchSegments }) => (
                                <SidebarLink
                                    key={name}
                                    name={name}
                                    href={href}
                                    Icon={Icon}
                                    active={
                                        matchSegments
                                            ? pathname.startsWith(href)
                                            : pathname === href
                                    }
                                    isOpen={isOpen}
                                />
                            )
                        )}
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex w-full flex-col items-center gap-1 px-4">
                    <TooltipProvider>
                        {[
                            {
                                name: "Settings",
                                href: "/settings",
                                Icon: Settings,
                            },
                        ].map(({ name, href, Icon }) => (
                            <SidebarLink
                                key={name}
                                name={name}
                                href={href}
                                Icon={Icon}
                                active={pathname === href}
                                isOpen={isOpen}
                            />
                        ))}
                    </TooltipProvider>
                </nav>
                <div className="w-full px-4">
                    <Separator className="my-6" />
                    <div className="flex justify-between ">
                        <div className="flex gap-3">
                            <UserAvatar imageUrl="" name="mohammed raad" />
                            {isOpen ? (
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-700">
                                        Mohammed Raad
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        mraad@gmail.com
                                    </span>
                                </div>
                            ) : null}
                        </div>
                        {isOpen ? (
                            <LogOut className="size-5 text-gray-500" />
                        ) : null}
                    </div>
                </div>
                <Button
                    className="absolute bottom-1/4 right-0 size-8 translate-x-1/2 rounded-full p-1"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <ChevronRight
                        className={cn(
                            "size-6 text-white transition-all  duration-300",
                            isOpen ? "rotate-180" : "rotate-0"
                        )}
                    />
                </Button>
            </aside>
        </div>
    )
}

export default Sidebar
