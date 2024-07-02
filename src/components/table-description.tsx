import { type FC, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface TableDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const TableDescription: FC<TableDescriptionProps> = ({
    children,
    className,
}) => {
    return (
        <p className={cn("mt-1 text-sm text-muted-foreground", className)}>
            {children}
        </p>
    )
}

export default TableDescription
