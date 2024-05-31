import React from "react"
import NextLink from "next/link"
import { ChevronRight, Github } from "lucide-react"

import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export async function ProjectGithubLInk({
    className,
    ...props
}: React.ComponentProps<typeof NextLink>) {
    return (
        <NextLink
            className={cn("z-10 flex items-center justify-center", className)}
            {...props}
        >
            <AnimatedGradientText>
                <Github className="size-4" />
                <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                <span
                    // eslint-disable-next-line tailwindcss/classnames-order
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r  from-[#fa8cff] via-[#9182ff] to-[#0476ff]  bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                    )}
                >
                    {site.name} Github Repo
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
        </NextLink>
    )
}

function AnimatedGradientText({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
                className
            )}
        >
            <div
                // eslint-disable-next-line tailwindcss/classnames-order
                className={`absolute inset-0 block size-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-px [border-radius:inherit] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
            />

            {children}
        </div>
    )
}
