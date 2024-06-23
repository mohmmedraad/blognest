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

interface SiteAuthorProps {
    defaultValue?: string
    onValueChange?: (value: string) => void
}

export function AuthorSelect({ defaultValue, onValueChange }: SiteAuthorProps) {
    const { authors } = useAuthorsSelectOptions()

    return (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select an author" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
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
