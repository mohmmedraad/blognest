import { type FC } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/server/db"
import { Eye } from "lucide-react"

import { getCachedUser } from "@/lib/cached-data"
import { buttonVariants } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import DashboardMain from "@/components/dashboard-main"
import PlateEditor from "@/components/plate-editor"
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar"
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons"
import SavingState from "@/components/plate-ui/savaing-state"
import PublishArticleDialog from "@/components/publish-article-dialog"

interface NewArticlePageProps {
    params: {
        articleSlug?: string
    }
}

const EditArticlePage: FC<NewArticlePageProps> = async ({
    params: { articleSlug },
}) => {
    if (!articleSlug) return notFound()

    const user = await getCachedUser()

    if (!user) {
        return null
    }

    const article = await db.article.findFirst({
        select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            topics: true,
            content: true,
            site: {
                select: {
                    id: true,
                },
            },
            author: {
                select: {
                    id: true,
                },
            },
        },
        where: {
            slug: articleSlug,
        },
    })

    if (!article) return

    return (
        <DashboardMain>
            <TooltipProvider
                disableHoverableContent
                delayDuration={500}
                skipDelayDuration={0}
            >
                <div className="max-w-[1336px] rounded-lg border bg-background shadow">
                    <PlateEditor content={article.content}>
                        <FixedToolbar>
                            <FixedToolbarButtons>
                                <SavingState articleId={article.id} />
                                <Link
                                    href={`/dashboard/articles/${article.slug}/preview`}
                                    className={buttonVariants({
                                        className: "gap-1",
                                        variant: "outline",
                                    })}
                                >
                                    <Eye className="size-4" />
                                    Preview
                                </Link>
                                <PublishArticleDialog
                                    editArticleValues={{
                                        title: article.title,
                                        id: article.id,
                                        slug: article.slug,
                                        status: article.status,
                                        topics: article.topics,
                                        author: article.author?.id,
                                        site: article.site?.id,
                                    }}
                                >
                                    Publish
                                </PublishArticleDialog>
                            </FixedToolbarButtons>
                        </FixedToolbar>
                    </PlateEditor>
                </div>
            </TooltipProvider>
        </DashboardMain>
    )
}

export default EditArticlePage
