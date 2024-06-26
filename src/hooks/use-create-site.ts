import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSiteAction } from "@/actions/sites/create-site-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { handleGenericError } from "@/lib/utils"
import { createSiteSchema } from "@/lib/validations/sites"

import { useServerActionMutation } from "./server-action-hooks"

export const useCreateSite = () => {
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof createSiteSchema>>({
        resolver: zodResolver(createSiteSchema),
        defaultValues: {
            title: "",
            description: "",
            subdomain: "",
        },
    })

    const router = useRouter()

    const { mutate, isPending } = useServerActionMutation(createSiteAction, {
        onSuccess: () => {
            toast.success("Site created successfully")
            setOpen(false)
            router.refresh()
            form.reset()
        },
        onError: (error) => {
            const errorCode = error.code
            if (errorCode === "NOT_AUTHORIZED") {
                toast.error("You must be logged in to create a site")
                return router.push("/sign-in?redirect=/dashboard/sites")
            }

            if (errorCode === "CONFLICT") {
                return form.setError("subdomain", {
                    message: "This subdomain is already taken",
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
        isPending,
        open,
        setOpen,
        createSite: mutate,
    }
}
