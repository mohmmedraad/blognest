"use client"

import { type FC, type HTMLAttributes } from "react"

import { useDeleteAuthor } from "@/hooks/use-delete-author"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DeleteAuthorDialogProps extends HTMLAttributes<HTMLElement> {
    id: string
    username: string
}

const DeleteAuthorDialog: FC<DeleteAuthorDialogProps> = ({
    children,
    id,
    username,
}) => {
    const { open, isPending, setOpen, deleteAuthor } = useDeleteAuthor()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh]">
                <DialogHeader className="sm:text-center">
                    <DialogTitle>
                        Delete Author with the username @{username}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex justify-center gap-4">
                    <Button
                        disabled={isPending}
                        variant={"outline"}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isPending}
                        variant={"destructive"}
                        onClick={() =>
                            deleteAuthor({
                                id,
                            })
                        }
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAuthorDialog
