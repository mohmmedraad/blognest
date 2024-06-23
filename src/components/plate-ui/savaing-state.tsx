"use client"

import { type FC } from "react"

import { cn } from "@/lib/utils"
import { useSaveArticleContent } from "@/hooks/use-save-article-content"

interface SavingStateProps {
    articleId: string
}

const SavingState: FC<SavingStateProps> = ({ articleId }) => {
    const { saving } = useSaveArticleContent(articleId)

    return (
        <p
            className={cn("text-sm", {
                "text-green-500 animate-fade-out": saving === "Saved",
                "text-red-500": saving === "Not Saved",
            })}
        >
            {saving}
        </p>
    )
}

export default SavingState
