"use client"

import { type FC } from "react"
import { SearchIcon, UserPlus } from "lucide-react"

import { useAuthors } from "@/hooks/use-authors"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/data-table"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableToolbar } from "@/components/data-table-toolbar"
import TableDescription from "@/components/table-description"
import TableHeading from "@/components/table-heading"

import { columns } from "./columns"
import CreateAuthorDialog from "./create-author-dialog"

interface AuthorsTableProps {}

export const AuthorsTable: FC<AuthorsTableProps> = ({}) => {
    const { data, isFetching, search, setSearch, setPage } = useAuthors()

    return (
        <div className="mt-8 rounded-md border bg-white">
            <div className="flex flex-wrap justify-between gap-6 px-6 py-5">
                <div>
                    <TableHeading>Your Authors</TableHeading>
                    <TableDescription>
                        Add, Delete and mange your Authors
                    </TableDescription>
                </div>
                <CreateAuthorDialog size="lg" className="gap-1.5">
                    <UserPlus className="size-5" /> Add Author
                </CreateAuthorDialog>
            </div>
            <DataTableToolbar>
                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                        className="w-full  max-w-80 pl-8"
                        placeholder="Search authors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                    />
                </div>
            </DataTableToolbar>
            <DataTable
                columns={columns}
                data={data?.authors ?? []}
                isFetching={isFetching}
                emptyState={
                    <>
                        <p className="mt-10 text-4xl font-bold text-gray-900">
                            NO Authors
                        </p>
                        <p className="mt-4 max-w-[512px] text-xl text-gray-600">
                            Change your filter or create new Authors to see them
                            here.
                        </p>
                    </>
                }
            />
            <DataTablePagination
                hasNextPage={data?.hasNextPage ?? false}
                hasPreviousPage={data?.hasPreviousPage ?? false}
                setPage={setPage}
            />
        </div>
    )
}
