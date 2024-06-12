import { useState } from "react"
import { getAuthorsOptionsAction } from "@/actions/authors/get-authors-actions"
import { useQuery } from "@tanstack/react-query"

import { useDebounce } from "@/hooks/use-debounce"

export const useAuthors = () => {
    const [search, setSearch] = useState("")
    const searchValue = useDebounce(search)
    const [page, setPage] = useState(1)
    const query = useQuery({
        queryKey: ["authors", page, searchValue],
        queryFn: () =>
            getAuthorsOptionsAction({ limit: 10, search: searchValue, page }),
    })

    return { ...query, search, setPage, setSearch }
}
