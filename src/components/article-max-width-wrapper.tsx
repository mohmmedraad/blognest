import { type FC, type HTMLAttributes, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ArticleMaxWidthWrapperProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}

const ArticleMaxWidthWrapper: FC<ArticleMaxWidthWrapperProps> = ({
    className,
    children,
}) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-[680px] px-6 sm:px-10",
                className
            )}
        >
            {children}
        </div>
    )
}

export default ArticleMaxWidthWrapper
