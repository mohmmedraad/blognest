import { useState } from "react"
import { useRouter } from "next/navigation"
import { createAuthorAction } from "@/actions/authors/create-author-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { handleGenericError } from "@/lib/utils"
import { createAuthorFormSchema } from "@/lib/validations/sites"

import { useUploadFile } from "./use-upload-file"

export const useCreateAuthor = () => {
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

    const { mutate, isPending } = useMutation({
        mutationFn: createAuthorAction,
        onSuccess: () => {
            toast.success("Author created successfully")
            setOpen(false)
            router.refresh()
            form.reset()
        },
        onError: (error) => {
            if (error.message === "UNAUTHORIZED") {
                toast.error("You must be logged in to create a author")
                return router.push("/sign-in?redirect=/dashboard/authors")
            }

            if (error.message === "CONFLICT") {
                return form.setError("username", {
                    message: "This username is already taken",
                })
            }

            if (error.message === "INVALID_DATA") {
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
