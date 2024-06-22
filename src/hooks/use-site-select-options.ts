import { getSitesSelectOptionsAction } from "@/actions/sites/get-sites-select-options-action"

import { QueryKeyFactory, useServerActionQuery } from "./server-action-hooks"

export const useSiteSelectOptions = () => {
    const { data, isFetching } = useServerActionQuery(
        getSitesSelectOptionsAction,
        {
            input: undefined,
            queryKey: QueryKeyFactory.getSitesSelectOptions(),
        }
    )

    return {
        sites: data ?? [],
        isFetching,
    }
}
