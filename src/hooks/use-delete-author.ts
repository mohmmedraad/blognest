import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteAuthorAction } from "@/actions/authors/delete-author-action"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { handleGenericError } from "@/lib/utils"

import { useServerActionMutation } from "./server-action-hooks"

export const useDeleteAuthor = () => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { mutate, isPending } = useServerActionMutation(deleteAuthorAction, {
        onSuccess: async () => {
            toast.success("Author created successfully")
            setOpen(false)
            await queryClient.invalidateQueries({
                queryKey: ["authors"],
            })
        },
        onError: (error) => {
            const errorCode = error.code
            if (errorCode === "NOT_AUTHORIZED") {
                toast.error("You must be logged in to create a author")
                return router.push("/sign-in?redirect=/dashboard/authors")
            }

            if (errorCode === "NOT_FOUND") {
                return toast.error("Author not found")
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
        deleteAuthor: mutate,
    }
}
