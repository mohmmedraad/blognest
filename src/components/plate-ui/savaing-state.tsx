"use client"

import { type FC } from "react"

import { cn } from "@/lib/utils"
import { useSaveArticle } from "@/hooks/use-save-article"

interface SavingStateProps {
    articleId: string
}

const SavingState: FC<SavingStateProps> = ({ articleId }) => {
    const { saving } = useSaveArticle(articleId)

    return (
        <p
            className={cn("text-sm", {
                "text-green-500": saving === "Saved",
                "text-red-500": saving === "Not Saved",
                "text-yellow-500": saving === "Saving...",
            })}
        >
            {saving}
        </p>
    )
}

export default SavingState
