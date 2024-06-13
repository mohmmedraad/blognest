"use client"

import { type Row, type Table } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type AuthorColumn } from "./columns"
import DeleteAuthorDialog from "./delete-author-dialog"
import EditAuthorDialog from "./edit-author-dialog"

interface TableRowActionsProps {
    row: Row<AuthorColumn>
    table: Table<AuthorColumn>
}

export function TableRowActions({ row }: TableRowActionsProps) {
    const author = row.original

    return (
        <DropdownMenu modal={false} key={"123"}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() =>
                        navigator.clipboard.writeText(author.username)
                    }
                >
                    Copy username
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <EditAuthorDialog
                    defaultValues={{
                        id: author.id,
                        name: author.name,
                        username: author.username,
                        avatar: author.avatar,
                    }}
                >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Edit
                    </DropdownMenuItem>
                </EditAuthorDialog>
                <DeleteAuthorDialog id={author.id} username={author.username}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Delete
                    </DropdownMenuItem>
                </DeleteAuthorDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
