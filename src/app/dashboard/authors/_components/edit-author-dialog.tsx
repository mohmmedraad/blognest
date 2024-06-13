"use client"

import { type FC, type HTMLAttributes } from "react"
import { type EditAuthorFormSchema } from "@/types"

import { useEditAuthor } from "@/hooks/use-edit-author"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FileUploader from "@/components/file-uploader"

interface EditAuthorDialogProps extends HTMLAttributes<HTMLElement> {
    defaultValues: EditAuthorFormSchema
}

const EditAuthorDialog: FC<EditAuthorDialogProps> = ({
    children,
    defaultValues,
}) => {
    const {
        form,
        open,
        isPending,
        isUploading,
        uploadedFiles,
        setOpen,
        uploadFiles,
        editAuthor,
    } = useEditAuthor(defaultValues)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create new Author</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) =>
                            editAuthor({
                                id: defaultValues.id,
                                name: values.name,
                                username: values.username,
                                avatar:
                                    uploadedFiles[0]?.url ??
                                    defaultValues.avatar,
                            })
                        )}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Mohammed"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="@mohammed"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>avatar</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            onUpload={uploadFiles}
                                            disabled={isPending}
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="mt-6 w-full"
                            type="submit"
                            disabled={isPending || isUploading}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditAuthorDialog
