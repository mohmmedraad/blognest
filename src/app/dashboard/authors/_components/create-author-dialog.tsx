"use client"

import { type ComponentProps, type FC } from "react"

import { useCreateAuthor } from "@/hooks/use-create-author"
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

interface CreateAuthorDialogProps extends ComponentProps<typeof Button> {}

const CreateAuthorDialog: FC<CreateAuthorDialogProps> = ({
    children,
    ...props
}) => {
    const {
        form,
        open,
        isPending,
        isUploading,
        uploadedFiles,
        setOpen,
        uploadFiles,
        createAuthor,
    } = useCreateAuthor()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button {...props}>{children}</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Create new Author</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) =>
                            createAuthor({
                                name: values.name,
                                username: values.username,
                                avatar: uploadedFiles[0]?.url ?? "",
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
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAuthorDialog
