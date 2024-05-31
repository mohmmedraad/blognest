import { type ComponentProps, type FC } from "react"
import NextLink from "next/link"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"

interface LinkProps
    extends ComponentProps<typeof NextLink>,
        VariantProps<typeof buttonVariants> {}

const Link: FC<LinkProps> = ({
    children,
    variant = "default",
    size,
    className,
    ...props
}) => {
    return (
        <NextLink
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {children}
            {variant === "default" ? (
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                </div>
            ) : null}
        </NextLink>
    )
}

export default Link
