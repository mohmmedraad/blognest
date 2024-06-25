"use client"

import {type ComponentProps, useEffect, useState, type FC } from "react"
import { useQueryState } from "nuqs"

import { useDebounce } from "@/hooks/use-debounce"

import { Input } from "./ui/input"

interface SearchInputProps extends ComponentProps<typeof Input> {
    param?: string
}

const SearchInput: FC<SearchInputProps> = ({ param = "text", ...props }) => {
    const [textParam, setTextParam] = useQueryState(param)
    const [inputValue, setInputValue] = useState(textParam ?? "")
    const debouncedInputValue = useDebounce(inputValue)

    useEffect(() => {
        void setTextParam(debouncedInputValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInputValue])

    return (
        <Input
            defaultValue={textParam ?? ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="search"
            {...props}
        />
    )
}

export default SearchInput
