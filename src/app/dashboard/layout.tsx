import { type FC } from "react"

import DashboardHeader from "./_components/dashboard-header"
import Sidebar from "./_components/sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex min-h-screen w-full bg-background">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
