import { useState } from "react"
import { useRouter } from "next/navigation"
import { createAuthorAction } from "@/actions/authors/create-author-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { handleGenericError } from "@/lib/utils"
import { createAuthorFormSchema } from "@/lib/validations/sites"

import { QueryKeyFactory, useServerActionMutation } from "./server-action-hooks"
import { useUploadFile } from "./use-upload-file"

export const useCreateAuthor = () => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof createAuthorFormSchema>>({
        resolver: zodResolver(createAuthorFormSchema),
        defaultValues: {
            name: "",
            username: "",
            avatar: [],
        },
    })
    const { uploadFiles, isUploading, uploadedFiles } =
        useUploadFile("imageUploader")
    const router = useRouter()

    const { mutate, isPending } = useServerActionMutation(createAuthorAction, {
        onSuccess: async () => {
            toast.success("Author created successfully")
            setOpen(false)
            await queryClient.invalidateQueries({
                queryKey: QueryKeyFactory.getAuthors(),
            })
            form.reset()
        },
        onError: (error) => {
            const errorCode = error.code
            if (errorCode === "NOT_AUTHORIZED") {
                toast.error("You must be logged in to create a author")
                return router.push("/sign-in?redirect=/dashboard/authors")
            }

            if (errorCode === "CONFLICT") {
                return form.setError("username", {
                    message: "This username is already taken",
                })
            }

            if (errorCode === "INPUT_PARSE_ERROR") {
                return toast.error("Your data is invalid")
            }
            return handleGenericError()
        },
    })

    return {
        form,
        open,
        isPending,
        isUploading,
        uploadedFiles,
        setOpen,
        uploadFiles,
        createAuthor: mutate,
    }
}
