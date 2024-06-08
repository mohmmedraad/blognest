import { type FC } from "react"

import Sidebar from "./_components/sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
    return (
        <div className="flex min-h-screen w-full bg-background">
            <Sidebar />
            {children}
        </div>
    )
}

export default DashboardLayout
