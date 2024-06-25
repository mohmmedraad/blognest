import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import {
    createServerActionsKeyFactory,
    setupServerActionHooks,
} from "zsa-react-query"

export const QueryKeyFactory = createServerActionsKeyFactory({
    getAuthors: () => ["authors"],
    getArticles: (keys: string[]) => ["articles", ...keys],
    getAuthorsSelectOptions: () => ["authors-select-options"],
    getSitesSelectOptions: () => ["sites-select-options"],
})

const {
    useServerActionQuery,
    useServerActionMutation,
    useServerActionInfiniteQuery,
} = setupServerActionHooks({
    hooks: {
        useQuery: useQuery,
        useMutation: useMutation,
        useInfiniteQuery: useInfiniteQuery,
    },
    queryKeyFactory: QueryKeyFactory,
})

export {
    useServerActionInfiniteQuery,
    useServerActionMutation,
    useServerActionQuery,
}
