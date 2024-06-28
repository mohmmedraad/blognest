import { type FC } from "react"

interface UserSitePageProps {
    params: {
        subdomain?: string
    }
}

const UserSitePage: FC<UserSitePageProps> = ({ params: { subdomain } }) => {
    return <div>{subdomain}</div>
}

export default UserSitePage
