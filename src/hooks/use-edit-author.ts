import { useState } from "react"
import { useRouter } from "next/navigation"
import { editAuthorAction } from "@/actions/authors/edit-author-action"
import type { EditAuthorActionSchema, EditAuthorFormSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { getUpdatedValues, handleGenericError } from "@/lib/utils"
import { createAuthorFormSchema } from "@/lib/validations/sites"

import { QueryKeyFactory, useServerActionMutation } from "./server-action-hooks"
import { useUploadFile } from "./use-upload-file"

export const useEditAuthor = ({
    name,
    username,
    avatar,
    id,
}: EditAuthorFormSchema) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof createAuthorFormSchema>>({
        resolver: zodResolver(createAuthorFormSchema),
        defaultValues: {
            name,
            username,
            avatar: [],
        },
    })
    const { uploadFiles, isUploading, uploadedFiles } =
        useUploadFile("imageUploader")
    const router = useRouter()

    const { mutate, isPending } = useServerActionMutation(editAuthorAction, {
        onSuccess: async () => {
            toast.success("Author created successfully")
            setOpen(false)
            form.reset()
            await queryClient.invalidateQueries({
                queryKey: QueryKeyFactory.getAuthors(),
            })
        },
        onError: (error) => {
            if (error.message === "NOT_AUTHORIZED") {
                toast.error("You must be logged in to create a author")
                return router.push("/sign-in?redirect=/dashboard/authors")
            }

            if (error.message === "CONFLICT") {
                return form.setError("username", {
                    message: "This username is already taken",
                })
            }

            if (error.message === "NOT_FOUND") {
                return toast.error("Author not found")
            }

            if (error.message === "INPUT_PARSE_ERROR") {
                return toast.error("Your data is invalid")
            }
            return handleGenericError()
        },
    })

    function onSubmit(data: Omit<EditAuthorActionSchema, "id">) {
        const { sameEntries, updatedValues } = getUpdatedValues(
            {
                name,
                username,
                avatar,
            },
            data
        )
        if (sameEntries) {
            toast.success("Author created successfully")
            setOpen(false)
            return form.reset()
        }

        mutate({ id, ...updatedValues })
    }

    return {
        form,
        open,
        isPending,
        isUploading,
        uploadedFiles,
        setOpen,
        uploadFiles,
        editAuthor: onSubmit,
    }
}
