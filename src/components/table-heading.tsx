import { type FC, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface TableHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const TableHeading: FC<TableHeadingProps> = ({ children, className }) => {
    return (
        <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
            {children}
        </h3>
    )
}

export default TableHeading
