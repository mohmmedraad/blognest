import { type FC } from "react"
import Link from "next/link"
import { type Article, type Authors } from "@prisma/client"
import { format } from "date-fns"

import ArticleMaxWidthWrapper from "./article-max-width-wrapper"
import RenderPlateContent from "./plate-ui/render-plate-content"
import { Separator } from "./ui/separator"
import { UserAvatar } from "./user-avatar"

interface RenderArticleProps {
    article: Pick<
        Article,
        "title" | "topics" | "createdAt" | "content" | "slug"
    >
    author: Pick<Authors, "name" | "username" | "avatar"> | null
    edit?: boolean
}

const RenderArticle: FC<RenderArticleProps> = ({ article, author }) => {
    return (
        <ArticleMaxWidthWrapper>
            <h1 className="mb-6 text-3xl font-bold text-gray-950 md:text-5xl">
                {article.title}
            </h1>
            <div className="flex gap-4">
                <UserAvatar
                    imageUrl={author?.avatar ?? "/placeholder.png"}
                    name={author?.name ?? ""}
                />
                <div>
                    <div className="flex gap-4">
                        <div className="text-gray-950">{author?.name}</div>
                        <Link
                            href={`/dashboard/articles/${article.slug}/edit`}
                            className="text-primary"
                        >
                            Edit
                        </Link>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-sm text-gray-500 sm:flex-row">
                        <span>
                            Published on{" "}
                            <time dateTime={article.createdAt.toString()}>
                                {format(article.createdAt, "do MMMM yyyy")}
                            </time>
                        </span>
                        <div>·</div>
                        {/* TODO: add dynamic */}
                        <div>4 min read</div>
                    </div>
                </div>
            </div>
            <Separator className="my-8" />
            <RenderPlateContent content={article.content} />
        </ArticleMaxWidthWrapper>
    )
}

export default RenderArticle
