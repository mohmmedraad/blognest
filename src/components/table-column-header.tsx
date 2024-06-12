import { type FC } from "react"

import { cn } from "@/lib/utils"

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TableHeader: FC<TableHeaderProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn("text-xs text-gray-600", className)} {...props}>
            {children}
        </div>
    )
}

export default TableHeader
