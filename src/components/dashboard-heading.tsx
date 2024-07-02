import { type FC, type HTMLAttributes } from "react"

interface DashboardHeadingProps extends HTMLAttributes<HTMLHeadElement> {}

const DashboardHeading: FC<DashboardHeadingProps> = ({ children }) => {
    return (
        <h2 className="mt-5 text-3xl font-semibold text-foreground">
            {children}
        </h2>
    )
}

export default DashboardHeading
