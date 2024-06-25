"use client"

import { type FC } from "react"
import Link from "next/link"
import { Plus, SearchIcon } from "lucide-react"

import { useArticles } from "@/hooks/use-articles"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableToolbar } from "@/components/data-table-toolbar"
import SearchInput from "@/components/search-input"
import TableDescription from "@/components/table-description"
import TableHeading from "@/components/table-heading"

import { columns } from "./columns"

interface ArticlesTableProps {}

export const ArticlesTable: FC<ArticlesTableProps> = ({}) => {
    const { data, isFetching, setPage } = useArticles()

    return (
        <div className="mt-8 rounded-md border bg-white">
            <div className="flex flex-wrap justify-between gap-6 px-6 py-5">
                <div>
                    <TableHeading>Your Articles</TableHeading>
                    <TableDescription>
                        Add, Delete and mange your Articles
                    </TableDescription>
                </div>
                <Link
                    href={"/dashboard/articles/new-article"}
                    className={buttonVariants({
                        size: "lg",
                        className: "gap-1.5",
                    })}
                >
                    <Plus className="size-5" /> Add Article
                </Link>
            </div>
            <DataTableToolbar>
                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <SearchInput
                        className="w-full  max-w-80 pl-8"
                        placeholder="Search article"
                        param="search"
                    />
                </div>
            </DataTableToolbar>
            <DataTable
                columns={columns}
                data={data?.articles ?? []}
                isFetching={isFetching}
                emptyState={
                    <>
                        <p className="mt-10 text-4xl font-bold text-gray-900">
                            NO Articles
                        </p>
                        <p className="mx-auto mt-4 w-full max-w-[512px] text-xl text-gray-600">
                            Change your filter or create new Articles to see
                            them here.
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
