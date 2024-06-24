import { type FC } from "react"
import { notFound } from "next/navigation"
import { db } from "@/server/db"

import { getCachedUser } from "@/lib/cached-data"
import ArticleMaxWidthWrapper from "@/components/article-max-width-wrapper"
import CustomBreadcrumb from "@/components/custom-breadcrumb"
import DashboardMain from "@/components/dashboard-main"
import RenderArticle from "@/components/render-article"

interface ArticlePreviewPageProps {
    params: {
        articleSlug?: string
    }
}

const ArticlePreviewPage: FC<ArticlePreviewPageProps> = async ({
    params: { articleSlug },
}) => {
    if (!articleSlug) return notFound()

    const user = await getCachedUser()

    if (!user) {
        return null
    }

    const article = await db.article.findFirst({
        select: {
            title: true,
            slug: true,
            topics: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                    username: true,
                    avatar: true,
                },
            },
        },
        where: {
            userId: user.id,
            slug: articleSlug,
        },
    })

    if (!article) return notFound()

    return (
        <DashboardMain>
            <ArticleMaxWidthWrapper>
                <CustomBreadcrumb
                    pathname={`/dashboard/articles/${articleSlug}/preview`}
                    className="mb-2"
                />
            </ArticleMaxWidthWrapper>

            <RenderArticle
                article={{
                    title: article.title,
                    slug: article.slug,
                    topics: article.topics,
                    content: article.content,
                    createdAt: article.createdAt,
                }}
                author={article.author}
                edit
            />
        </DashboardMain>
    )
}

export default ArticlePreviewPage
