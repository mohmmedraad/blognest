"use client"

import { useState, type FC } from "react"
import { useRouter } from "next/navigation"
import { deleteSiteAction } from "@/actions/sites/delete-site-action"
import { type Site } from "@prisma/client"
import { toast } from "sonner"

import { handleGenericError } from "@/lib/utils"
import { useServerActionMutation } from "@/hooks/server-action-hooks"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/plate-ui/button"
import { DialogContent, DialogTrigger } from "@/components/plate-ui/dialog"

interface DeleteSiteProps {
    site: Pick<Site, "id" | "subdomain" | "title">
}

const DeleteSite: FC<DeleteSiteProps> = ({ site }) => {
    const { open, isPending, setOpen, deleteSite } = useDeleteSite(
        site.subdomain
    )
    return (
        <Dialog defaultOpen={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"} className="mt-6">
                    Delete {site.title}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <h4 className="text-lg font-semibold text-gray-950">
                    Delete {site.title}
                </h4>
                <p className="mt-2 text-muted-foreground">
                    Are you sure you want to delete this site? This action
                    cannot be undone.
                </p>
                <div className="flex gap-4">
                    <Button
                        variant={"destructive"}
                        onClick={() =>
                            deleteSite({
                                id: site.id,
                            })
                        }
                        disabled={isPending}
                    >
                        Delete
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
function useDeleteSite(subdomain: string) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { mutate: deleteSite, isPending } = useServerActionMutation(
        deleteSiteAction,
        {
            onSuccess: () => {
                setOpen(false)
                toast.success("Your site is updated")
                router.push(`/dashboard/sites`)
            },
            onError: (error) => {
                const errorCode = error.code

                if (errorCode === "NOT_AUTHORIZED") {
                    toast.error("You must be logged in to delete site")
                    return router.push(
                        `/sign-in?redirect=/dashboard/sites/${subdomain}/settings`
                    )
                }

                if (errorCode === "NOT_FOUND") {
                    return toast.error("Site not found")
                }

                return handleGenericError()
            },
        }
    )

    return { open, isPending, setOpen, deleteSite }
}

export default DeleteSite
