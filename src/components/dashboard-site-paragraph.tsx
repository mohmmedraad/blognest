import { type FC, type HTMLAttributes } from "react"

interface DashboardSiteParagraphProps
    extends HTMLAttributes<HTMLParagraphElement> {}

const DashboardSiteParagraph: FC<DashboardSiteParagraphProps> = ({
    children,
}) => {
    return <h2 className="mt-1 text-sm text-muted-foreground">{children}</h2>
}

export default DashboardSiteParagraph
