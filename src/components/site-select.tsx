"use client"

import Image from "next/image"

import { useSiteSelectOptions } from "@/hooks/use-site-select-options"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Skeleton } from "./ui/skeleton"

interface SiteSelectProps {
    value?: string
    onValueChange?: (value: string) => void
}

export function SiteSelect({ value, onValueChange }: SiteSelectProps) {
    const { sites, isFetching } = useSiteSelectOptions()

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

                    {sites.map((site) => (
                        <SelectItem key={site.id} value={site.id}>
                            <div className="flex items-center gap-2">
                                <Image
                                    className="size-6 rounded-full shadow-lg"
                                    width={24}
                                    height={24}
                                    src={site.logo ?? "/placeholder.png"}
                                    alt={site.title}
                                />
                                <div>{site.title}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
