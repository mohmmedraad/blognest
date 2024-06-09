import { useRouter } from "next/navigation"
import { createSiteAction } from "@/actions/sites/create-site-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { handleGenericError } from "@/lib/utils"
import { createSiteSchema } from "@/lib/validations/sites"

export const useCreateSite = () => {
    const form = useForm<z.infer<typeof createSiteSchema>>({
        resolver: zodResolver(createSiteSchema),
        defaultValues: {
            title: "",
            description: "",
            subdomain: "",
        },
    })

    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: createSiteAction,
        onSuccess: () => {
            toast.success("Site created successfully")
            router.refresh()
        },
        onError: (error) => {
            if (error.message === "UNAUTHORIZED") {
                toast.error("You must be logged in to create a site")
                return router.push("/sign-in?redirect=/dashboard/sites")
            }
            if (error.message === "CONFLICT") {
                return form.setError("subdomain", {
                    message: "This subdomain is already taken",
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
        createSite: mutate,
        isPending,
    }
}
