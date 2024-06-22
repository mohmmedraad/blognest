"use client"

import Image from "next/image"

import { useAuthorsSelectOptions } from "@/hooks/use-authors-select-options"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Skeleton } from "./ui/skeleton"

interface SiteAuthorProps {
    value?: string
    onValueChange?: (value: string) => void
}

export function AuthorSelect({ value, onValueChange }: SiteAuthorProps) {
    const { authors, isFetching } = useAuthorsSelectOptions()

    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {isFetching &&
                        new Array(5).fill(0).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <Skeleton className="h-9 w-full" />
                            </div>
                        ))}

                    {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                            <div className="flex items-center gap-2">
                                <Image
                                    className="size-6 rounded-full shadow-lg"
                                    width={24}
                                    height={24}
                                    src={author.avatar ?? "/placeholder.png"}
                                    alt={author.name}
                                />
                                <div>{author.name}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
