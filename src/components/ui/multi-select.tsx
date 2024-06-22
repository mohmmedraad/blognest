"use client"

import React, { useEffect, type FC } from "react"
import { TagInput, type Tag, type TagInputProps } from "emblor"

interface MultiSelectProps
    extends Omit<
        TagInputProps,
        "tags" | "setTags" | "activeTagIndex" | "setActiveTagIndex"
    > {
    value?: string[]
    onChange?: (value: string[] | null) => void
}

const MultiSelect: FC<MultiSelectProps> = ({ onChange, value, ...props }) => {
    const [tags, setTags] = React.useState<Tag[]>(
        value?.map((tag) => ({ id: tag, text: tag })) ?? []
    )
    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
        null
    )

    useEffect(() => {
        if (!onChange) return
        onChange(tags.map((tag) => tag.text))
    }, [tags, onChange])

    return (
        <TagInput
            {...props}
            setTags={(newTags) => {
                setTags(newTags)
            }}
            tags={tags}
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={setActiveTagIndex}
        />
    )
}

export default MultiSelect
