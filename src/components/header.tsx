"use client"

import { type FC } from "react"
import NextLink from "next/link"

import { site } from "@/config/site"

import Logo from "./logo"
import Link from "./ui/link"

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <header className="fixed left-0 top-4 z-50 w-full px-5">
            <div className="flex w-full items-center justify-between rounded-md bg-background p-2 shadow-xl">
                <NextLink className="flex items-center gap-2" href={"/"}>
                    <Logo />
                    <span className="hidden text-base font-bold sm:block">
                        {site.name}
                    </span>
                </NextLink>
                <div className="flex items-center justify-center gap-5">
                    <nav className="hidden sm:block">
                        <ul className="flex gap-5">
                            {site.links.map((link, i) => (
                                <li key={link.name}>
                                    <NextLink
                                        key={i}
                                        href={link.name}
                                        className="text-gray-600 hover:text-primary
                                "
                                    >
                                        {link.name}
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Link href={"/dashboard"} size={"lg"}>
                        Dashboard
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
