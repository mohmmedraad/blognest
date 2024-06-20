import { useState } from "react"
import { getAuthorsOptionsAction } from "@/actions/authors/get-authors-actions"

import { useDebounce } from "@/hooks/use-debounce"

import { useServerActionQuery } from "./server-action-hooks"

export const useAuthors = () => {
    const [search, setSearch] = useState("")
    const searchValue = useDebounce(search)
    const [page, setPage] = useState(1)
    const query = useServerActionQuery(getAuthorsOptionsAction, {
        input: {
            limit: 10,
            search: searchValue,
            page,
        },
        queryKey: ["authors"],
    })

    return { ...query, search, setPage, setSearch }
}
