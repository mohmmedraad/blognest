import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteAuthorAction } from "@/actions/authors/delete-author-action"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { handleGenericError } from "@/lib/utils"

export const useDeleteAuthor = () => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: deleteAuthorAction,
        onSuccess: async () => {
            toast.success("Author created successfully")
            setOpen(false)
            await queryClient.invalidateQueries({
                queryKey: ["authors"],
            })
        },
        onError: (error) => {
            if (error.message === "UNAUTHORIZED") {
                toast.error("You must be logged in to create a author")
                return router.push("/sign-in?redirect=/dashboard/authors")
            }

            if (error.message === "NOT_FOUND") {
                return toast.error("Author not found")
            }

            if (error.message === "INVALID_DATA") {
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
