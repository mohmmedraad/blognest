import { type FC, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface DashboardMainProps extends HTMLAttributes<HTMLDivElement> {}

const DashboardMain: FC<DashboardMainProps> = ({ children, className }) => {
    return (
        <main className={cn("w-full p-6 sm:p-8", className)}>{children}</main>
    )
}

export default DashboardMain
