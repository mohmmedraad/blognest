import { useState } from "react"
import { getArticlesAction } from "@/actions/articles/get-articles-action"
import { parseAsString, useQueryState } from "nuqs"

import { useServerActionQuery } from "./server-action-hooks"

export const useArticles = () => {
    const [searchParam] = useQueryState("search", parseAsString.withDefault(""))
    const [sortBy] = useState("createAt.desc")
    const [page, setPage] = useState(1)

    const query = useServerActionQuery(getArticlesAction, {
        input: {
            limit: 10,
            search: searchParam,
            page: page,
            sortBy,
        },
        queryKey: ["articles", searchParam, sortBy, page.toString()],
    })

    return { ...query, setPage }
}
