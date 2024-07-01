"use client"

import { type FC } from "react"
import { useRouter } from "next/navigation"
import { toggleLiveAction } from "@/actions/sites/toggle-live-action"
import type { Site } from "@prisma/client"
import { toast } from "sonner"

import { handleGenericError } from "@/lib/utils"
import { useServerActionMutation } from "@/hooks/server-action-hooks"
import { Switch } from "@/components/ui/switch"

interface ToggleLiveProps {
    site: Pick<Site, "id" | "subdomain" | "live">
}

const ToggleLive: FC<ToggleLiveProps> = ({ site }) => {
    const router = useRouter()
    const { mutate: toggleLive, isPending } = useServerActionMutation(
        toggleLiveAction,
        {
            onSuccess: () => {
                return toast.success("Your site is updated")
            },
            onError: (error) => {
                const errorCode = error.code

                if (errorCode === "NOT_AUTHORIZED") {
                    toast.error("You must be logged in to update site")
                    return router.push(
                        `/sign-in?redirect=/dashboard/sites/${site.subdomain}/settings`
                    )
                }

                if (errorCode === "NOT_FOUND") {
                    return toast.error("Site not found")
                }

                if (errorCode === "INPUT_PARSE_ERROR") {
                    return toast.error("Your data is invalid")
                }

                return handleGenericError()
            },
        }
    )
    return (
        <Switch
            defaultChecked={site.live}
            onCheckedChange={(e) =>
                toggleLive({
                    id: site.id,
                    live: e,
                })
            }
            disabled={isPending}
        />
    )
}

export default ToggleLive
