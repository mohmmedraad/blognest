import { useEffect, useRef, useState } from "react"
import { getUserSiteArticles } from "@/actions/sites/get-user-site-articles"
import type { InitialUserSiteArticles } from "@/types"
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
        rootMargin: "500px",
    })

    const {
        data,
        isFetching,
        isFetchingNextPage,
        isFetchedAfterMount,
        fetchNextPage,
    } = useServerActionInfiniteQuery(getUserSiteArticles, {
        queryKey: ["user-site-articles", subdomain, searchParam, sortBy],
        skip: true,
        input: ({ pageParam }) => ({
            subdomain,
            page: pageParam,
            limit: 10,
            sortBy,
            search: searchParam,
        }),
        refetchOnWindowFocus: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) =>
            lastPage?.length !== 0 ? pages.length : undefined,
        // @ts-expect-error error
        initialData: { pages: [initialArticles], pageParams: [0] },
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
    const articles = data?.pages?.flatMap((page) => page) ?? []
    return {
        ref,
        articles,
        isFetching,
        isInitialLoading,
        isFetchingNextPage,
    }
}
