import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteArticleAction } from "@/actions/articles/delete-article-action"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { handleGenericError } from "@/lib/utils"

import { QueryKeyFactory, useServerActionMutation } from "./server-action-hooks"

export const useDeleteArticle = () => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { mutate, isPending } = useServerActionMutation(deleteArticleAction, {
        onSuccess: async () => {
            toast.success("Article deleted successfully")
            setOpen(false)
            await queryClient.invalidateQueries({
                queryKey: QueryKeyFactory.getArticles(),
            })
        },
        onError: (error) => {
            const errorCode = error.code
            if (errorCode === "NOT_AUTHORIZED") {
                toast.error("You must be logged in to delete this article")
                return router.push("/sign-in?redirect=/dashboard/articles")
            }

            if (errorCode === "NOT_FOUND") {
                return toast.error("Article not found")
            }

            if (errorCode === "INPUT_PARSE_ERROR") {
                return toast.error("Your data is invalid")
            }
            return handleGenericError()
        },
    })

    return {
        open,
        isPending,
        setOpen,
        deleteArticle: mutate,
    }
}
