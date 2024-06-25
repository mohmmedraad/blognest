import { useState } from "react"
import { getAuthorsOptionsAction } from "@/actions/authors/get-authors-actions"
import { parseAsString, useQueryState } from "nuqs"

import { useServerActionQuery } from "./server-action-hooks"

export const useAuthors = () => {
    const [searchParam] = useQueryState("search", parseAsString.withDefault(""))
    const [page, setPage] = useState(1)
    const query = useServerActionQuery(getAuthorsOptionsAction, {
        input: {
            limit: 10,
            search: searchParam,
            page,
        },
        queryKey: ["authors", searchParam, page.toString()],
    })

    return { ...query, setPage }
}
