import { type FC, type HTMLAttributes } from "react"

interface DashboardMainProps extends HTMLAttributes<HTMLDivElement> {}

const DashboardMain: FC<DashboardMainProps> = ({ children }) => {
    return <main className="w-full p-6 sm:p-8">{children}</main>
}

export default DashboardMain
