import { useRouter } from "next/navigation"
import { editSiteDetailsAction } from "@/actions/sites/edit-site-details"
import type {
    SiteDetailsActionSchema,
    SiteEditDetailsFormDefaultValues,
} from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { getUpdatedValues, handleGenericError } from "@/lib/utils"
import { siteDetailsFormSchema } from "@/lib/validations/sites"

import { useUploadFile } from "./use-upload-file"

export const useSiteDetails = (
    defaultValues: SiteEditDetailsFormDefaultValues
) => {
    const form = useForm<z.infer<typeof siteDetailsFormSchema>>({
        resolver: zodResolver(siteDetailsFormSchema),
        defaultValues: {
            title: defaultValues.title,
            description: defaultValues.description,
            subdomain: defaultValues.subdomain,
            logo: [],
        },
    })
    const { uploadFiles, isUploading, uploadedFiles } =
        useUploadFile("imageUploader")
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: editSiteDetailsAction,
        onSuccess: (_, variables) => {
            toast.success("Your site is updated")
            if (variables.subdomain) {
                return router.push(
                    `/dashboard/sites/${variables.subdomain}/details`
                )
            }
        },
        onError: (error) => {
            const errorCode = error.message

            if (errorCode === "CONFLICT") {
                return form.setError("subdomain", {
                    message: "This subdomain is already taken",
                })
            }

            if (errorCode === "UNAUTHORIZED") {
                toast.error("You must be logged in to create a site")
                return router.push(
                    `/sign-in?redirect=/dashboard/sites/${defaultValues.subdomain}/details`
                )
            }

            if (errorCode === "NOT_FOUND") {
                return toast.error("Site not found")
            }

            if (errorCode === "INVALID_DATA") {
                return toast.error("Your data is invalid")
            }

            return handleGenericError()
        },
    })

    function onSubmit({ id, ...data }: SiteDetailsActionSchema) {
        console.log("Here")
        const { sameEntries, updatedValues } = getUpdatedValues(
            {
                title: defaultValues.title,
                description: defaultValues.description,
                logo: defaultValues.logo!,
                subdomain: defaultValues.subdomain,
            },
            data
        )

        if (sameEntries) {
            return toast.success("Your site is updated")
        }

        mutate({
            ...updatedValues,
            id,
        })
    }

    return {
        form,
        isPending,
        isUploading,
        uploadedFiles,
        uploadFiles,
        editSite: onSubmit,
    }
}
