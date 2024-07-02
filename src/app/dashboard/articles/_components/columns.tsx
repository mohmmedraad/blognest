"use client"

import Image from "next/image"
import Link from "next/link"
import { type getArticlesAction } from "@/actions/articles/get-articles-action"
import { type ColumnDef } from "@tanstack/react-table"
import { type inferServerActionReturnData } from "zsa"

import TableColumnHeader from "@/components/table-column-header"

import { TableRowActions } from "./table-row-actions"

export type ArticleColumn = inferServerActionReturnData<
    typeof getArticlesAction
>["articles"][number]

export const columns: ColumnDef<ArticleColumn>[] = [
    {
        id: "article",
        accessorFn: (row) => ({ title: row.title, slug: row.slug }),
        header: () => <TableColumnHeader>Article</TableColumnHeader>,
        cell: ({ row }) => {
            const { title, slug } =
                row.getValue<Pick<ArticleColumn, "title" | "slug">>("article")
            return (
                <div className="w-[220px]">
                    <Link
                        href={`/dashboard/articles/${slug}/edit`}
                        className="line-clamp-1 w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-900"
                    >
                        {title}
                    </Link>
                </div>
            )
        },
    },
    {
        id: "author",
        accessorFn: (row) => row,
        header: () => <TableColumnHeader>Author</TableColumnHeader>,
        cell: ({ row }) => {
            const { author } =
                row.getValue<Pick<ArticleColumn, "author">>("author")
            return (
                <div className="flex w-[220px] items-center gap-3">
                    {author ? (
                        <>
                            <Image
                                src={author?.avatar ?? "/placeholder.png"}
                                width={40}
                                height={40}
                                alt="author avatar"
                                className="size-10 rounded-full shadow-xl"
                            />
                            <div className="flex flex-col">
                                <span className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-900">
                                    {author?.name}
                                </span>
                                <Link
                                    href={`${author?.username}`}
                                    className="text-sm text-gray-600 hover:underline hover:underline-offset-4"
                                >
                                    @{author?.username}
                                </Link>
                            </div>
                        </>
                    ) : (
                        <span className="text-sm text-gray-600">No author</span>
                    )}
                </div>
            )
        },
    },
    {
        id: "site",
        accessorFn: (row) => row,
        header: () => <TableColumnHeader>Site</TableColumnHeader>,
        cell: ({ row }) => {
            const { site } = row.getValue<Pick<ArticleColumn, "site">>("site")
            return (
                <div className="flex w-[220px] items-center gap-3">
                    {site ? (
                        <>
                            <Image
                                src={site?.logo ?? "/placeholder.png"}
                                width={40}
                                height={40}
                                alt="site avatar"
                                className="size-10 rounded-full shadow-xl"
                            />

                            <Link
                                href={`${site?.subdomain}`}
                                className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-900 hover:underline hover:underline-offset-4"
                            >
                                {site?.subdomain}
                            </Link>
                        </>
                    ) : (
                        <span className="text-sm text-gray-600">
                            NO article
                        </span>
                    )}
                </div>
            )
        },
    },
    {
        id: "status",
        accessorFn: (row) => row.status,
        header: () => <TableColumnHeader>Status</TableColumnHeader>,
        cell: ({ row }) => (
            <div className="flex w-[100px] items-center">
                <span className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-600">
                    {row.getValue("status")}
                </span>
            </div>
        ),
    },
    {
        id: "views",
        accessorFn: (row) => row._count.views,
        header: () => <TableColumnHeader>Views</TableColumnHeader>,
        cell: ({ row }) => (
            <div className="flex w-[100px] items-center">
                <span className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-600">
                    {row.getValue("views")}
                </span>
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row, table }) => <TableRowActions row={row} table={table} />,
    },
]
