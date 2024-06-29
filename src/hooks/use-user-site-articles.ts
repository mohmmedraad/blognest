import { useEffect, useRef, useState } from "react"
import { getUserSiteArticles } from "@/actions/sites/get-user-site-articles"
import type { InitialUserSiteArticles } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import { parseAsString, useQueryState } from "nuqs"

import { useServerActionInfiniteQuery } from "./server-action-hooks"

export const useUserSiteArticles = (
    subdomain: string,
    initialArticles: InitialUserSiteArticles
) => {
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [searchParam] = useQueryState("search", parseAsString.withDefault(""))
    const [sortBy] = useQueryState("sortBy", parseAsString.withDefault(""))

    const lastArticleRef = useRef<HTMLElement>(null)
    const [ref, entry] = useIntersectionObserver({
        root: lastArticleRef.current,
        threshold: 1,
        rootMargin: "100px",
    })

    const {
        data,
        isFetching,
        isFetchingNextPage,
        isFetchedAfterMount,
        fetchNextPage,
    } = useInfiniteQuery({
        // @ts-expect-error error
        queryFn: getUserSiteArticles,
        skip: true,
        input: () => ({
            subdomain,
            limit: 1,
            sortBy: ["createdAt", "desc"],
            search: "",
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>
            lastPage?.length !== 0 ? pages.length : undefined,
        initialData: { pages: [initialArticles], pageParams: [1] },
    })

    useEffect(() => {
        const isIntersecting = entry?.isIntersecting
        if (isIntersecting) {
            void fetchNextPage()
        }
    }, [entry, fetchNextPage])

    useEffect(() => {
        if (!isFetchedAfterMount) return
        setIsInitialLoading(false)
    }, [isFetchedAfterMount])

    const articles = data?.pages?.flatMap((page) => page)
    return {
        ref,
        articles,
        isFetching,
        isInitialLoading,
        isFetchingNextPage,
    }
}
