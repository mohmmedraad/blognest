import { QueryKeyFactory, useServerActionQuery } from "./server-action-hooks"
import { getAuthorsSelectOptionsAction } from "@/actions/sites/get-authors-select-options-action"

export const useAuthorsSelectOptions = () => {
    const { data, isFetching } = useServerActionQuery(
        getAuthorsSelectOptionsAction,
        {
            input: undefined,
            queryKey: QueryKeyFactory.getAuthorsSelectOptions(),
        }
    )

    return {
        authors: data ?? [],
        isFetching,
    }
}
