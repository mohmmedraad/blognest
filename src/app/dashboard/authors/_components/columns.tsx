"use client"

import Image from "next/image"
import NextLink from "next/link"
import { type getAuthorsOptionsAction } from "@/actions/authors/get-authors-actions"
import { type ColumnDef } from "@tanstack/react-table"

import TableColumnHeader from "@/components/table-column-header"

import { TableRowActions } from "./table-row-actions"

export type AuthorColumn = Awaited<
    ReturnType<typeof getAuthorsOptionsAction>
>["authors"][number]

export const columns: ColumnDef<AuthorColumn>[] = [
    {
        id: "author",
        accessorFn: (row) => ({
            name: row.name,
            username: row.username,
            avatar: row.avatar,
        }),
        header: () => <TableColumnHeader>Author</TableColumnHeader>,
        cell: ({ row }) => {
            const { name, username, avatar } =
                row.getValue<
                    Pick<AuthorColumn, "name" | "username" | "avatar">
                >("author")
            return (
                <div className="flex w-[220px] items-center gap-3">
                    <Image
                        src={avatar}
                        width={40}
                        height={40}
                        alt="author avatar"
                        className="size-10 rounded-full shadow-xl"
                    />
                    <div className="flex flex-col">
                        <span className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-900">
                            {name}
                        </span>
                        <NextLink
                            href={username}
                            className="text-sm text-gray-600 hover:underline hover:underline-offset-4"
                        >
                            @{username}
                        </NextLink>
                    </div>
                </div>
            )
        },
    },
    {
        id: "articles",
        accessorFn: (row) => row._count.articles,
        header: () => <TableColumnHeader>Articles</TableColumnHeader>,
        cell: ({ row }) => (
            <div className="flex w-[100px] items-center">
                <span className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-600">
                    {row.getValue("articles")}
                </span>
            </div>
        ),
    },
    // {
    //     id: "site",
    //     accessorKey: "site",
    //     header: () => <TableColumnHeader>Site</TableColumnHeader>,
    //     cell: ({ row }) => (
    //         <div className="flex w-[100px] items-center">
    //             <span className="w-full overflow-x-hidden text-ellipsis text-sm font-medium text-gray-900">
    //                 {row.getValue<Site>("site").subdomain}
    //             </span>
    //         </div>
    //     ),
    // },
    {
        id: "actions",
        cell: ({ row, table }) => <TableRowActions row={row} table={table} />,
    },
]
