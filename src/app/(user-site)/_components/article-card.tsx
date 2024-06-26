import { forwardRef, type FC } from "react"
import Image from "next/image"
import type { InitialUserSiteArticles } from "@/types"

import { Skeleton } from "@/components/ui/skeleton"

interface ArticleCardProps {
    article: InitialUserSiteArticles[number]
    siteSubdomain: string
}

const ArticleCard = forwardRef<HTMLDivElement, ArticleCardProps>(
    ({ siteSubdomain, article }, ref) => (
        <div ref={ref} className="relative rounded-3xl bg-[#f7f7f1] p-8">
            <a href={`/${siteSubdomain}/articles/${article.slug}`}>
                <div className="relative my-14 aspect-video w-full overflow-hidden">
                    <Image
                        src={article.thumbnail ?? "/placeholder.png"}
                        alt="image"
                        fill
                        className="size-full rounded-3xl object-cover shadow-md"
                    />
                </div>
                <h3 className="mt-2 line-clamp-1 text-sm font-medium text-gray-950">
                    {article.title}
                </h3>
                <div className="mt-1 flex gap-3">
                    {article.topics.map((topic) => (
                        <span key={topic} className="text-xs text-[#617187]">
                            {topic}
                        </span>
                    ))}
                </div>
            </a>
        </div>
    )
)

export const ArticleCardSkelton: FC = () => {
    return (
        <div className="relative rounded-3xl bg-[#f7f7f1] p-8">
            <Skeleton className="relative my-14 aspect-video w-full rounded-3xl" />
            <Skeleton className="relative mt-2 h-3.5 rounded-3xl" />
            <div className="mt-2 flex gap-3">
                {new Array(3).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-3 w-5 text-[#617187]" />
                ))}
            </div>
        </div>
    )
}

ArticleCard.displayName = "ArticleCard"

export default ArticleCard
