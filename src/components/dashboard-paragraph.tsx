import { type FC, type HTMLAttributes } from "react"

interface DashboardParagraphProps
    extends HTMLAttributes<HTMLParagraphElement> {}

const DashboardParagraph: FC<DashboardParagraphProps> = ({ children }) => {
    return <h2 className="mt-1 text-base text-gray-600">{children}</h2>
}

export default DashboardParagraph
