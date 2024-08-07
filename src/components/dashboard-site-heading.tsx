import { type FC, type HTMLAttributes } from "react"

interface DashboardSiteHeadingProps extends HTMLAttributes<HTMLHeadElement> {}

const DashboardSiteHeading: FC<DashboardSiteHeadingProps> = ({ children }) => {
    return <h3 className="text-lg font-semibold text-foreground">{children}</h3>
}

export default DashboardSiteHeading
