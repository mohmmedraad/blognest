"use client"

import { type FC } from "react"
import type { InitialUserSiteArticles } from "@/types"

import { useUserSiteArticles } from "@/hooks/use-user-site-articles"

import ArticleCard, { ArticleCardSkelton } from "./article-card"

interface SiteArticlesProps {
    subdomain: string
    initialArticles: InitialUserSiteArticles
}

const SiteArticles: FC<SiteArticlesProps> = ({
    subdomain,
    initialArticles,
}) => {
    const { articles, isFetching, isInitialLoading, isFetchingNextPage, ref } =
        useUserSiteArticles(subdomain, initialArticles)

    if (articles?.length === 0 && !isFetching) {
        return (
            <div className="mt-40 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold md:text-4xl">
                    NO ARTICLES FOUND
                </h2>
                <p className="mb-6 mt-4 max-w-md">
                    Try to change your search parameters
                </p>
            </div>
        )
    }

    return (
        <div className="mt-24 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {isFetching && !isInitialLoading && !isFetchingNextPage ? (
                new Array(10)
                    .fill(0)
                    .map((_, index) => <ArticleCardSkelton key={index} />)
            ) : (
                <>
                    {articles?.map((article, index) => {
                        const isLastArticle = index === articles?.length - 1
                        if (isLastArticle) {
                            return (
                                <ArticleCard
                                    key={article.slug}
                                    ref={ref}
                                    siteSubdomain={subdomain}
                                    article={article}
                                />
                            )
                        } else {
                            return (
                                <ArticleCard
                                    key={article.slug}
                                    siteSubdomain={subdomain}
                                    article={article}
                                />
                            )
                        }
                    })}
                    {isFetchingNextPage
                        ? new Array(10)
                              .fill(0)
                              .map((_, index) => (
                                  <ArticleCardSkelton key={index} />
                              ))
                        : null}
                </>
            )}
        </div>
    )
}

export default SiteArticles
