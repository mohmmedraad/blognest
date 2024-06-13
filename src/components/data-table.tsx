import React, { useState, type FC, type HTMLAttributes } from "react"
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { Skeleton } from "./ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"

interface TableDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const TableDescription: FC<TableDescriptionProps> = ({
    children,
    className,
}) => {
    return (
        <p className={cn("mt-1 text-sm text-gray-600", className)}>
            {children}
        </p>
    )
}

interface TableHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

export const TableHeading: FC<TableHeadingProps> = ({
    children,
    className,
}) => {
    return (
        <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
            {children}
        </h3>
    )
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isFetching?: boolean
    emptyState: JSX.Element
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isFetching = false,
    emptyState: EmptyState,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const isTableEmpty = table.getRowModel().rows?.length === 0 && !isFetching
    return (
        <Table className="relative">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {isTableEmpty && (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-[500px] text-center"
                        >
                            {EmptyState}
                        </TableCell>
                    </TableRow>
                )}

                {isFetching && (
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                        ))}
                    </TableRow>
                )}

                {!isTableEmpty &&
                    !isFetching &&
                    new Array(5).fill(null).map((_, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
