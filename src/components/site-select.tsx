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

interface SiteSelectProps {
    defaultValue?: string
    onValueChange?: (value: string) => void
}

export function SiteSelect({ defaultValue, onValueChange }: SiteSelectProps) {
    const { sites } = useSiteSelectOptions()

    return (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a site" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
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
