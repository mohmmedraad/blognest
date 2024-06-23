import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { updateArticleAction } from "@/actions/articles/update-article-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { getUpdatedValues, handleGenericError } from "@/lib/utils"
import { updateArticleSchema } from "@/lib/validations/articles"

import { useServerActionMutation } from "./server-action-hooks"

type DefaultValues = z.infer<typeof updateArticleSchema>

export const usePublishArticle = (defaultValues: DefaultValues) => {
    const [open, setOpen] = useState(false)
    const form = useForm<DefaultValues>({
        resolver: zodResolver(
            updateArticleSchema.omit({
                id: true,
            })
        ),
        defaultValues,
    })

    const router = useRouter()
    const pathname = usePathname()

    const { mutate, isPending } = useServerActionMutation(updateArticleAction, {
        onSuccess: () => {
            toast.success("Article is updated")
            setOpen(false)
        },
        onError: (error) => {
            const errorCode = error.code
            if (errorCode === "NOT_AUTHORIZED") {
                toast.error("You must be logged in to edit this article")
                return router.push(`/sign-in?redirect=${pathname}`)
            }

            if (errorCode === "CONFLICT") {
                return form.setError("slug", {
                    message: "This slug is already taken",
                })
            }

            if (errorCode === "INPUT_PARSE_ERROR") {
                return toast.error("Your data is invalid")
            }

            if (errorCode !== "NOT_FOUND") {
                return handleGenericError()
            }

            // if the article or author or site does not exist
            const errorData = error.data as unknown as
                | { field: string }
                | undefined

            if (errorData === undefined) {
                return toast.error("This article does not exist")
            }

            const errorField = errorData.field
            if (errorField === "author") {
                return form.setError("author", {
                    message: "This author does not exist",
                })
            }

            if (errorField === "site") {
                return form.setError("site", {
                    message: "This site does not exist",
                })
            }
        },
    })

    function onSubmit(data: Omit<DefaultValues, "id">) {
        const { sameEntries, updatedValues } = getUpdatedValues(
            {
                title: defaultValues.title,
                slug: defaultValues.slug,
                topics: defaultValues.topics,
                status: defaultValues.status,
                site: defaultValues.site,
                author: defaultValues.author,
            },
            data
        )
        if (sameEntries) {
            toast.success("Article is updated")
            setOpen(false)
            return form.reset()
        }

        mutate({ id: defaultValues.id, ...updatedValues })
    }

    return {
        form,
        isPending,
        open,
        setOpen,
        createSite: onSubmit,
    }
}
