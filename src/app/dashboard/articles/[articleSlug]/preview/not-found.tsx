import { type FC } from "react"
import Link from "next/link"
import { SearchX } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import DashboardMain from "@/components/dashboard-main"
import RefreshButton from "@/components/refresh-button"

interface EditArticleNotFoundPageProps {}

const EditArticleNotFoundPage: FC<EditArticleNotFoundPageProps> = ({}) => {
    return (
        <DashboardMain className="flex items-center justify-center">
            <div>
                <div className="mx-auto max-w-max rounded-xl border border-gray-300 p-3.5">
                    <SearchX className="size-7 text-gray-700" />
                </div>
                <p className="mx-auto mt-10 text-center text-4xl font-bold text-gray-900">
                    Article not found
                </p>
                <p className=" mx-auto mt-4 max-w-[512px] text-center text-xl text-gray-600">
                    The article you are trying to edit does not exist. It may
                    have been deleted or the URL is incorrect.
                </p>
                <div className="mx-auto mt-5 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/dashboard"
                        className={buttonVariants({
                            variant: "outline",
                        })}
                    >
                        Back to dashboard
                    </Link>
                    <RefreshButton>Refresh the page</RefreshButton>
                </div>
            </div>
        </DashboardMain>
    )
}

export default EditArticleNotFoundPage
