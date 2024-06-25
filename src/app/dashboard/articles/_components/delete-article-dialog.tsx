"use client"

import { type FC, type HTMLAttributes } from "react"

import { useDeleteArticle } from "@/hooks/use-delete-article"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DeleteArticleDiablogProps extends HTMLAttributes<HTMLElement> {
    id: string
    title: string
}

const DeleteArticleDialog: FC<DeleteArticleDiablogProps> = ({
    children,
    id,
    title,
}) => {
    const { open, isPending, setOpen, deleteArticle } = useDeleteArticle()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh]">
                <DialogHeader className="sm:text-center">
                    <DialogTitle>
                        Delete Author with the title &apos;{title}&apos;?
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
                            deleteArticle({
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

export default DeleteArticleDialog
