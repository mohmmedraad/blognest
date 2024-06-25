"use client"

import Link from "next/link"
import { type Row, type Table } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { siteUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { type ArticleColumn } from "./columns"
import DeleteArticleDialog from "./delete-article-dialog"

interface TableRowActionsProps {
    row: Row<ArticleColumn>
    table: Table<ArticleColumn>
}

export function TableRowActions({ row }: TableRowActionsProps) {
    const article = row.original

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
                    onClick={async () => {
                        const siteSubdomain = article.site?.subdomain
                        if (!siteSubdomain) {
                            return toast.error("Article not linked to any site")
                        }

                        await navigator.clipboard.writeText(
                            `${siteUrl(siteSubdomain)}/articles/${article.slug}`
                        )
                        return toast.success("Article URL copied to clipboard")
                    }}
                >
                    Copy article url
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Link
                        className="size-full"
                        href={`/dashboard/articles/${article.slug}/edit`}
                    >
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DeleteArticleDialog id={article.id} title={article.title}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Delete
                    </DropdownMenuItem>
                </DeleteArticleDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
